import { useState } from "react";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
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
  }),
  columnHelper.accessor((row) => row.taskTimeSeconds, {
    id: "taskTimeSeconds",
    header: "Work Time",
    cell: (info) => info.getValue(),
  }),
];

const SessionLog = () => {
  const [data] = useState<Log[]>(() => [...DUMMY_DATA]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    enableMultiRowSelection: false,
  });

  console.log("table", table);
  console.log("rowSeelction state", table.getState().rowSelection);
  console.log("selected row model", table.getSelectedRowModel().rows);

  return (
    <table className="w-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr className="flex" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                className={clsx("text-start", {
                  "w-full": header.column.columnDef.header === "Task Name",
                  "w-28": header.column.columnDef.header === "Work Time",
                })}
                key={header.id}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
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
              <input
                className="sr-only"
                type="radio"
                id={`radio-${row.id}`}
                name="selectedRow"
                checked={isRowSelected}
                readOnly
                aria-hidden="true"
              />
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={clsx("overflow-hidden whitespace-nowrap", {
                    "w-full": cell.column.columnDef.header === "Task Name",
                    "w-28": cell.column.columnDef.header === "Work Time",
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
