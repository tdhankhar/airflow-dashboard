import { ReactElement, HTMLAttributes } from "react";
import "./index.css";

interface Column<T> {
  title: string;
  key: keyof T;
  render: (row: T) => ReactElement | string;
}

interface TableProps<T> {
  columns: Column<T>[];
  rows: T[];
  onRow?: (row: T) => HTMLAttributes<HTMLTableCellElement>;
}

const Table = <T,>({ columns, rows, onRow }: TableProps<T>) => {
  return (
    <table>
      <tr>
        {columns.map((column) => (
          <th key={String(column.key)}>{column.title}</th>
        ))}
      </tr>
      {rows.map((row, index) => (
        <tr key={index} className="row">
          {columns.map((column) => (
            <td key={String(column.key)} {...(onRow ? onRow(row) : {})}>
              {column.render(row)}
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
};

export default Table;
