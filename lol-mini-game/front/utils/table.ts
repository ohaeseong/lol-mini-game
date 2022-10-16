import { Column } from '../types/table';

export function renderLabel<T>(column: Column<T>) {
  return typeof column.label === 'function' ? column.label() : column.label;
}
