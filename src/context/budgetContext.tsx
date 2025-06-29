"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { toast } from "sonner";
import { Budget } from "@/types/Budge.type";
import { Category } from "@/types/Category.type";
import { useCategory } from "./categoryContext";
import { useAuth, useUser } from "@clerk/nextjs";
import * as Sentry from "@sentry/nextjs";

interface BudgetContextProps {
  isLoading: boolean;
  budgets: Budget[];
  categories: Category[];
  editingBudget: Budget | null;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  openModalToCreate: () => void;
  openModalToEdit: (budget: Budget) => void;
  saveBudget: (data: Budget) => Promise<Budget | undefined>;
  handleDelete: (budget: Budget) => Promise<void>;
  setEditingBudget: (budget: Budget | null) => void;
}

const BudgetContext = createContext<BudgetContextProps | undefined>(undefined);

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { categories } = useCategory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  const fetchBudgets = useCallback(async () => {
    if (!user?.id || !user.hasVerifiedEmailAddress) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/budget`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (!response.ok) {
        toast.error("Erro ao buscar dados");
        return;
      }

      const budgetsData = await response.json();
      setBudgets(budgetsData);
    } catch (error) {
      Sentry.captureException(error);
      console.error("Erro ao carregar dados:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, user?.hasVerifiedEmailAddress, getToken]);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  const openModalToCreate = useCallback(() => {
    setEditingBudget(null);
    setIsModalOpen(true);
  }, []);

  const openModalToEdit = useCallback((budget: Budget) => {
    setEditingBudget(budget);
    setIsModalOpen(true);
  }, []);

  const saveBudget = useCallback(
    async (data: Budget): Promise<Budget | undefined> => {
      try {
        const url = data.id
          ? `${process.env.NEXT_PUBLIC_BASE_URL_API}/budget/${data.id}`
          : `${process.env.NEXT_PUBLIC_BASE_URL_API}/budget`;
        const method = data.id ? "PATCH" : "POST";

        const res = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
          body: JSON.stringify({
            categoryId: data.category.id,
            limit: data.limit,
            date: data.date,
          }),
        });

        if (!res.ok) {
          toast.error(
            data.id ? "Erro ao atualizar orçamento" : "Erro ao criar orçamento"
          );
          return;
        }

        const saved = await res.json();
        toast.success(
          data.id
            ? "Orçamento atualizado com sucesso!"
            : "Orçamento criado com sucesso!"
        );

        await fetchBudgets();

        setIsModalOpen(false);
        setEditingBudget(null);

        return saved;
      } catch (error) {
        Sentry.captureException(error);
        console.error("Erro no saveBudget:", error);
        toast.error("Não foi possível salvar o orçamento.");
      }
    },
    [fetchBudgets, getToken]
  );

  const handleDelete = useCallback(
    async (budget: Budget) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL_API}/budget/${budget.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${await getToken()}`,
            },
          }
        );

        if (!res.ok) {
          toast.error("Erro ao deletar orçamento");
          return;
        }

        toast.success("Orçamento excluído com sucesso!");
        await fetchBudgets();
      } catch (error) {
        Sentry.captureException(error);
        console.error("Erro ao excluir orçamento:", error);
        toast.error("Não foi possível excluir o orçamento.");
      }
    },
    [fetchBudgets, getToken]
  );

  const value = useMemo(
    () => ({
      isLoading,
      budgets,
      categories,
      editingBudget,
      isModalOpen,
      setIsModalOpen,
      openModalToCreate,
      openModalToEdit,
      saveBudget,
      handleDelete,
      setEditingBudget,
    }),
    [
      isLoading,
      budgets,
      categories,
      editingBudget,
      isModalOpen,
      saveBudget,
      handleDelete,
      openModalToCreate,
      openModalToEdit,
      setIsModalOpen,
      setEditingBudget,
    ]
  );

  return (
    <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
  );
};

export const useBudget = (): BudgetContextProps => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
};
