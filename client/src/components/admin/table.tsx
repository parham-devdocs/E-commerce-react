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
      <div className="w-full overflow-x-auto">

<table className="min-w-full border-red-500">
  <thead>
    {table.getHeaderGroups().map((headerGroup) => (
      <tr key={headerGroup.id} >
        {headerGroup.headers.map((header) => (
          <th 
            key={header.id} 
            className="px-6 py-4 text-right   text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-neutral-800"
          
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
        className={`border-b border-gray-200 dark:border-neutral-700 ${rowIndex % 2 === 0 ? 'bg-white dark:bg-stone-900' : 'bg-gray-200 dark:bg-neutral-800'}`}
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
</div>
    );
  }