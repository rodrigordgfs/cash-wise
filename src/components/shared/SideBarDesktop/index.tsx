"use client";

import {
  BarChart3,
  CreditCard,
  Home as HomeIcon,
  LogOut,
  PieChart,
  Settings,
  Target,
  User,
  Wallet,
} from "lucide-react";
import { NavItem } from "../NavItem";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/sidebarContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useTranslation } from "react-i18next";

export const SideBarDesktop = () => {
  const { t } = useTranslation();
  const { isSidebarOpen } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <aside
      className={`${
        isSidebarOpen ? "w-64" : "w-0"
      } transition-all duration-300 ease-in-out overflow-hidden flex-col border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hidden md:flex fixed top-14 bottom-0`}
    >
      <div className="flex flex-col flex-1">
        <div className="flex flex-col space-y-1 p-4">
          <NavItem
            href="/dashboard"
            icon={HomeIcon}
            title={t("menu.dashboard")}
            isActive={pathname === "/dashboard"}
          />
          <NavItem
            href="/dashboard/transactions"
            icon={CreditCard}
            title={t("menu.transactions")}
            isActive={pathname.startsWith("/dashboard/transactions")}
          />
          <NavItem
            href="/dashboard/categories"
            icon={PieChart}
            title={t("menu.categories")}
            isActive={pathname.startsWith("/dashboard/categories")}
          />
          <NavItem
            href="/dashboard/budgets"
            icon={Wallet}
            title={t("menu.budgets")}
            isActive={pathname.startsWith("/dashboard/budgets")}
          />
          <NavItem
            href="/dashboard/goals"
            icon={Target}
            title={t("menu.goals")}
            isActive={pathname.startsWith("/dashboard/goals")}
          />
          <NavItem
            href="/dashboard/reports"
            icon={BarChart3}
            title={t("menu.reports")}
            isActive={pathname.startsWith("/dashboard/reports")}
          />
          <NavItem
            href="/dashboard/settings"
            icon={Settings}
            title={t("menu.settings")}
            isActive={pathname.startsWith("/dashboard/settings")}
          />
          <NavItem
            href="/dashboard/profile"
            icon={User}
            title={t("menu.profile")}
            isActive={pathname.startsWith("/dashboard/profile")}
          />
        </div>
      </div>
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
        <button
          className="w-full cursor-pointer flex items-center px-3 py-2 rounded-md text-red-500 dark:text-red-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-5 w-5" />
          {t("menu.logout")}
        </button>
      </div>
    </aside>
  );
};