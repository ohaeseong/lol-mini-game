export type SortableValue = number | string | null | undefined | Date;

export type Column<T> = {
  key: string;
  label: string | (() => JSX.Element);
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
  headClassName?: string;
  value?: (value: T) => SortableValue;
  render: (value: T, rowIndex?: number) => JSX.Element | string | number | null;
  onClick?: (value: T) => void;
};
