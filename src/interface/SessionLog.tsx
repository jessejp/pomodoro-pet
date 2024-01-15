import {
  Row,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { Log } from "../store/types";
import { LogTimer } from "./timer/LogTimer";
import Button from "./ui/Button";



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

const SessionLog = () => {
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [data, setData] = useState<Log[]>(() => [...DUMMY_DATA]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const columnHelper = createColumnHelper<Log>();

  const columns = useMemo(
    () => [
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
        cell: (info) => (
          <LogTimer
            initialSeconds={info.getValue()}
            row={info.row}
            handleDismount={(sec: number, activeRow: Row<Log>) => {
              setData((prev) => {
                return prev.map((row, index) => {
                  if (index === activeRow.index) {
                    return {
                      ...row,
                      taskTimeSeconds: sec,
                    };
                  }
                  return row;
                });
              });
            }}
          />
        ),
        footer: (info) => info.column.id,
      }),
    ],
    [columnHelper]
  );
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
    debugTable: false,
  });

  const handleAddNewTask = () => {
    setData((prevState) => {
      return [...prevState, { task: newTaskName, taskTimeSeconds: 0 }];
    });
    setNewTaskName("");
  };

  console.count("SessionLog");

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
                      "relative flex items-center whitespace-nowrap",
                      {
                        "w-full overflow-hidden": cell.column.id === "taskName",
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
