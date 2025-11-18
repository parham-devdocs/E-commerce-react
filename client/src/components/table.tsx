import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    type ColumnDef,

  } from "@tanstack/react-table";
  
  
  
  export interface TableProps<T> {
    columns: ColumnDef<T>[];
    data: T[];
  }
  
  export default function Table<T>({ columns, data }: TableProps<T>) {
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });
  
    return (
<table className="bg-gray-200 dark:bg-neutral-800 min-w-full border-collapse">
  <thead>
    {table.getHeaderGroups().map((headerGroup) => (
      <tr key={headerGroup.id} className="border-b border-gray-300 dark:border-neutral-700">
        {headerGroup.headers.map((header) => (
          <th 
            key={header.id} 
            className="px-6 py-4 text-right   text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-neutral-700"
          
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
          </th>
        ))}
      </tr>
    ))}
  </thead>
  <tbody>
    {table.getRowModel().rows.map((row, rowIndex) => (
      <tr 
        key={row.id} 
        className={`border-b border-gray-200 dark:border-neutral-700 ${rowIndex % 2 === 0 ? 'bg-white dark:bg-neutral-800' : 'bg-gray-50 dark:bg-neutral-800'}`}
      >
        {row.getVisibleCells().map((cell) => (
          <td 
            key={cell.id} 
            className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300"
            style={{ width: `${100 / table.getHeaderGroups()[0].headers.length}%` }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>
    );
  }