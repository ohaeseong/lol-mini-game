import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import { Column } from '../types/table';
import { renderLabel } from '../utils/table';

type Props<T> = {
  className?: React.HtmlHTMLAttributes<HTMLDivElement>['className'];
  rowClassName?: React.HtmlHTMLAttributes<HTMLDivElement>['className'];
  columns: Column<T>[];
  values: T[];
  emphasizeTopThree?: boolean;
  showIndex?: boolean;
  loading?: boolean;
};

function Table<T>({
  className,
  rowClassName,
  columns,
  values,
  emphasizeTopThree = true,
  showIndex = true,
  loading = true,
}: Props<T>) {
  return (
    <table className={classNames('', className)}>
      <thead className={classNames('mb-4 border-b border-light-gray-100')}>
        <Row>
          {showIndex && <Th className="w-14 text-left text-sm">#</Th>}
          {columns.map((column) => (
            <Th
              key={column.key}
              className={classNames('text-left', column.headClassName)}
            >
              {renderLabel(column)}
            </Th>
          ))}
        </Row>
      </thead>
      <tbody>
        {loading ? (
          <Row>
            <Td>Loading...</Td>
          </Row>
        ) : (
          <>
            {values.map((value, index) => (
              <Row key={index} className={classNames('', rowClassName)}>
                {showIndex && (
                  <Td
                    className={classNames('w-10 pt-5', {
                      'text-brown-400': emphasizeTopThree && index < 3,
                      'text-gray-200': !emphasizeTopThree || index >= 3,
                    })}
                  >
                    {index + 1}
                  </Td>
                )}
                {columns.map((column) => (
                  <Td
                    key={column.key}
                    className={classNames('', column.className, {
                      'text-brown-400': emphasizeTopThree && index < 3,
                      'text-gray-200': !emphasizeTopThree || index >= 3,
                    })}
                  >
                    {column.render(value)}
                  </Td>
                ))}
              </Row>
            ))}
          </>
        )}
      </tbody>
    </table>
  );
}

const Row: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  >
> = ({ className, children }) => {
  return <tr className={classNames('', className)}>{children}</tr>;
};

const Th: React.FC<
  React.DetailedHTMLProps<
    React.ThHTMLAttributes<HTMLTableHeaderCellElement>,
    HTMLTableHeaderCellElement
  >
> = ({ className, children }) => {
  return <th className={classNames('', className)}>{children}</th>;
};

const Td: React.FC<
  React.DetailedHTMLProps<
    React.TdHTMLAttributes<HTMLTableHeaderCellElement>,
    HTMLTableHeaderCellElement
  >
> = ({ className, children }) => {
  return <td className={classNames('', className)}>{children}</td>;
};

export default Table;
