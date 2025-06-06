import { Goal } from "@/types/Goal.type";
import { useTranslation } from "react-i18next";

interface GoalCardFooterProps {
  goal: Goal;
}

export const GoalCardFooter = ({ goal }: GoalCardFooterProps) => {
  const { t } = useTranslation();

  const percentage = Math.round((goal.currentAmount / goal.targetAmount) * 100);
  const isWarning = percentage >= 80 && percentage < 100;
  const isComplete = percentage >= 100;

  const deadline = new Date(goal.deadline);
  const today = new Date();
  const daysLeft = Math.ceil(
    (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="px-6 py-3 border-t border-zinc-200 dark:border-zinc-800">
      {isComplete ? (
        <p className="text-sm text-emerald-500">{t("goals.goalAchieved")}</p>
      ) : isWarning ? (
        <p className="text-sm text-amber-500">{t("goals.almostThere")}</p>
      ) : (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {daysLeft > 0
            ? `${daysLeft} ${t("goals.daysLeft")}`
            : t("goals.deadelineExpired")}
        </p>
      )}
    </div>
  );
};
