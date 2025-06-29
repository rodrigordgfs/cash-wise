import { Edit, Trash } from "lucide-react";
import { GoalCardHeader } from "../GoalCardHeader";
import { GoalCardContent } from "../GoalCardContent";
import { GoalCardFooter } from "../GoalCardFooter";
import { Goal } from "@/types/Goal.type";
import { useTranslation } from "react-i18next";
import { useDialog } from "@/context/dialogContext";

interface GoalCardProps {
  goal: Goal;
  onEdit?: (goal: Goal) => void;
  onDelete?: (goal: Goal) => void;
}

export const GoalCard = ({ goal, onEdit, onDelete }: GoalCardProps) => {
  const { t } = useTranslation();
  const { showDialog } = useDialog();

  const handleDelete = () => {
    showDialog({
      title: t("goals.dialogDeleteTitle"),
      description: t("goals.dialogDeleteDescription"),
      confirmLabel: t("goals.dialogDeleteConfirm"),
      cancelLabel: t("goals.dialogDeleteCancel"),
      onConfirm: () => onDelete?.(goal),
    });
  };

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <div className="p-6 pb-2 flex items-center justify-between">
        <GoalCardHeader goal={goal} />
        <div className="flex gap-1">
          <button
            title={t("goals.editGoal")}
            onClick={() => onEdit?.(goal)}
            className="p-1 rounded-md text-zinc-500 hover:text-emerald-500 dark:text-zinc-400 dark:hover:text-emerald-500 cursor-pointer"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            title={t("goals.deleteGoal")}
            onClick={handleDelete}
            className="p-1 rounded-md text-zinc-500 hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-400 cursor-pointer"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </div>
      <GoalCardContent goal={goal} />
      <GoalCardFooter goal={goal} />
    </div>
  );
};
