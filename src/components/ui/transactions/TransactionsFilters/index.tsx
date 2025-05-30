"use client";

import { SearchInput } from "../SearchInput";
import { DateFilter } from "../DateFilter";
import { SortButton } from "../SortButton";
import { TransactionTypeSelector } from "../TransactionTypeSelector";
import { TransactionTypeFilter } from "@/types/Transaction.type";
interface TransactionFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setSelectedDate: (date: Date | undefined) => void;
  selectedDate?: Date;
  transactionType: TransactionTypeFilter;
  setTransactionType: (type: TransactionTypeFilter) => void;
  setSortOrder: (order: "none" | "asc" | "desc") => void;
  sortOrder: "none" | "asc" | "desc";
}

export const TransactionFilters = ({
  searchTerm,
  setSearchTerm,
  selectedDate,
  setSelectedDate,
  transactionType,
  setTransactionType,
  setSortOrder,
  sortOrder,
}: TransactionFiltersProps) => {
  return (
    <div className="relative rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <div className="p-6 pb-3">
        <h3 className="text-lg font-semibold">Filtros</h3>
      </div>
      <div className="p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <div className="flex-1">
            <SearchInput value={searchTerm} onChange={setSearchTerm} />
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex gap-2 relative">
              <DateFilter
                selectedDate={selectedDate}
                onChange={setSelectedDate}
              />
              <SortButton setSortOrder={setSortOrder} sortOrder={sortOrder} />
            </div>
            <TransactionTypeSelector
              transactionType={transactionType}
              setTransactionType={setTransactionType}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
