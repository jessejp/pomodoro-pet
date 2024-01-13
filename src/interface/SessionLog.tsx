import { useState } from "react";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import clsx from "clsx";

type Log = {
  task: string;
  taskTimeSeconds: number;
};

const DUMMY_DATA: Log[] = [
  {
    task: "Writing documentation",
    taskTimeSeconds: 7200,
  },
  {
    task: "code feat-style-session-log-v2",
    taskTimeSeconds: 60 * 60 * 1 + 60 * 5,
  },
  {
    task: "Designing Session Log V2",
    taskTimeSeconds: 60 * 30 + 35,
  },
];

const columnHelper = createColumnHelper<Log>();

const columns = [
  columnHelper.accessor("task", {
    header: "Task Name",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.taskTimeSeconds, {
    id: "taskTimeSeconds",
    header: "Work Time",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
];

const SessionLog = () => {
  const [data] = useState<Log[]>(() => [...DUMMY_DATA]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <table className="w-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr className="flex" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className={clsx("text-start", {
                  "cursor-pointer select-none": header.column.getCanSort(),
                  "w-full": header.column.columnDef.header === "Task Name",
                  "w-32": header.column.columnDef.header === "Work Time",
                })}
                onClick={header.column.getToggleSortingHandler()}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
                {{
                  asc: "▴",
                  desc: "▾",
                }[header.column.getIsSorted() as string] ?? null}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => {
          const isRowSelected = row.getIsSelected();
          return (
            <tr
              className={clsx("flex cursor-pointer hover:bg-primary-200", {
                "bg-accent-400": isRowSelected,
              })}
              role="radio"
              key={row.id}
              onClick={() => row.toggleSelected()}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={clsx("overflow-hidden whitespace-nowrap", {
                    "w-full": cell.column.columnDef.header === "Task Name",
                    "w-32": cell.column.columnDef.header === "Work Time",
                  })}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default SessionLog;
