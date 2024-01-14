import { useEffect, useState } from "react";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import clsx from "clsx";
import Button from "./ui/Button";
import { formatTimeVerbose } from "../utils/formatTime";

type Log = {
  task: string;
  taskTimeSeconds: number;
};

const DUMMY_DATA: Log[] = [
  {
    task: "Designing Session Log V2",
    taskTimeSeconds: 60 * 30 + 35,
  },
  {
    task: "Writing documentation",
    taskTimeSeconds: 7200,
  },
  {
    task: "Code feat-style-session-log-v2",
    taskTimeSeconds: 60 * 60 * 1 + 60 * 5,
  },
];

const columnHelper = createColumnHelper<Log>();

const columns = [
  columnHelper.accessor("task", {
    id: "taskName",
    header: "Task Name",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.taskTimeSeconds, {
    id: "taskTimeSeconds",
    header: "Work Time",
    cell: (info) => formatTimeVerbose(info.getValue()),
    footer: (info) => info.column.id,
  }),
];

const SessionLog = () => {
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [data, setData] = useState<Log[]>(() => [...DUMMY_DATA]);
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

  const { rows } = table.getSelectedRowModel();

  useEffect(() => {
    const interval = setInterval(() => {
      if (rows.length) {
        setData((prev) => {
          return prev.map((row, index) => {
            if (index === rows[0].index) {
              return {
                ...row,
                taskTimeSeconds: row.taskTimeSeconds + 1,
              };
            } else {
              return row;
            }
          });
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [rows, setData, data]);

  const handleAddNewTask = () => {
    setData((prevState) => {
      return [...prevState, { task: newTaskName, taskTimeSeconds: 0 }];
    });
    setNewTaskName("");
  };

  return (
    <table className="w-full text-tertiary-900">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr
            className="flex gap-8 rounded-t-xl bg-primary-300 px-6 py-2 font-semibold"
            key={headerGroup.id}
          >
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className={clsx("text-start", {
                  "cursor-pointer select-none": header.column.getCanSort(),
                  "w-full": header.column.columnDef.header === "Task Name",
                  "w-36": header.column.columnDef.header === "Work Time",
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
              className={clsx("flex cursor-pointer gap-8 px-6 py-2", {
                "bg-primary-100 hover:bg-primary-150": !isRowSelected,
                "bg-primary-200 font-semibold": isRowSelected,
              })}
              role="radio"
              key={row.id}
              onClick={() => row.toggleSelected()}
            >
              {row.getVisibleCells().map((cell) => {
                return (
                  <td
                    key={cell.id}
                    className={clsx(
                      "relative flex items-center overflow-hidden whitespace-nowrap",
                      {
                        "w-full": cell.column.id === "taskName",
                        "w-36": cell.column.id === "taskTimeSeconds",
                      }
                    )}
                  >
                    {cell.column.id === "taskTimeSeconds" && isRowSelected && (
                      <img
                        className="absolute -left-8 h-6 w-6"
                        src="/icons/stopwatch.gif"
                      />
                    )}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr className="flex gap-8 rounded-b-xl bg-primary-100 px-6 py-2">
          <td className="relative w-full">
            <form
              className="relative -left-0.5"
              onSubmit={(event) => {
                event.preventDefault();
                handleAddNewTask();
              }}
            >
              <input
                className="h-8 w-full rounded-lg bg-secondary-100 pl-1.5"
                value={newTaskName}
                type="text"
                placeholder="New Task"
                onChange={(event) => {
                  setNewTaskName(event.target.value);
                }}
              />
            </form>
          </td>
          <td className="w-fit min-w-[9rem]">
            <Button
              icon="note-x16-tertiary-900"
              variant="tiny"
              intent="primary-light"
              onClick={handleAddNewTask}
            >
              Add Task
            </Button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default SessionLog;
