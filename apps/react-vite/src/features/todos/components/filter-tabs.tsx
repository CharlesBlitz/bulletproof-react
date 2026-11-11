export type TodoFilter = 'all' | 'active' | 'completed';

const FILTERS: { value: TodoFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

type FilterTabsProps = {
  value: TodoFilter;
  onChange: (filter: TodoFilter) => void;
};

export const FilterTabs = ({ value, onChange }: FilterTabsProps) => {
  return (
    <div
      role="tablist"
      aria-label="Filter todos"
      className="inline-flex w-fit gap-1 rounded-lg bg-slate-200/60 p-1"
    >
      {FILTERS.map((filter) => {
        const selected = filter.value === value;
        return (
          <button
            key={filter.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(filter.value)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
              selected
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
};
