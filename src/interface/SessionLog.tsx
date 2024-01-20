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
import { useEffect, useMemo, useState } from "react";
import { Log } from "../store/types";
import { LogTimer } from "./timer/LogTimer";
import Button from "./ui/Button";
import { useBoundStore } from "../store/useBoundStore";

export const SessionLog = () => {
  const { sessionLog, createLog, updateSessionLog } = useBoundStore(
    (state) => ({
      sessionLog: state.sessionLog,
      createLog: state.createLog,
      updateSessionLog: state.updateSessionLog,
    })
  );

  const [data, setData] = useState<Log[]>(() => [...sessionLog]);
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
            rowId={info.row.id}
            isSelected={info.row.getIsSelected()}
            handleDismount={(sec: number) => {
              const isSelected = info.row.getIsSelected();
              if (!isSelected) {
                updateSessionLog({
                  task: info.row.original.task,
                  taskTimeSeconds: sec,
                });
              }
            }}
          />
        ),
        footer: (info) => info.column.id,
      }),
    ],
    [columnHelper, updateSessionLog]
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

  useEffect(() => {
    setData(sessionLog);
  }, [sessionLog]);

  const handleAddNewTask = (task: string) => {
    createLog({ task, taskTimeSeconds: 0 });
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
          return <LogRow key={row.id} {...row} />;
        })}
      </tbody>
      <tfoot>
        <LogInputRow handleAddNewTask={handleAddNewTask} />
      </tfoot>
    </table>
  );
};

const LogRow: React.FC<Row<Log>> = (row) => {
  const isRowSelected = row.getIsSelected();
  return (
    <tr
      className={clsx("flex cursor-pointer gap-8 px-6 py-2", {
        "bg-primary-100 hover:bg-primary-150": !isRowSelected,
        "bg-primary-200 font-semibold": isRowSelected,
      })}
      role="radio"
      onClick={() => row.toggleSelected()}
    >
      {row.getVisibleCells().map((cell) => {
        return (
          <td
            key={cell.id}
            className={clsx("relative flex items-center whitespace-nowrap", {
              "w-full overflow-hidden": cell.column.id === "taskName",
              "w-36": cell.column.id === "taskTimeSeconds",
            })}
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
};

interface LogInputRowProps {
  handleAddNewTask: (newTaskName: string) => void;
}

const LogInputRow: React.FC<LogInputRowProps> = ({ handleAddNewTask }) => {
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");

  const validate = (value: string) => {
    if (value.length === 0) {
      setErrorMessage("Task name can't be empty! 😦");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  return (
    <tr className="flex gap-8 rounded-b-xl bg-primary-100 px-6 py-2">
      <td className="relative w-full">
        <form
          className="relative -left-0.5"
          onSubmit={(event) => {
            event.preventDefault();
            if (validate(newTaskName) === false) return;

            handleAddNewTask(newTaskName);
            setNewTaskName("");
          }}
        >
          {!!errorMessage && (
            <div className="absolute -top-10 rounded-xl bg-primary-400 px-4 py-1 text-md text-tertiary-900">
              {errorMessage}
              <button
                className="absolute -right-2 -top-2 aspect-square rounded-full bg-tertiary-350 px-1.5 text-[12px] font-bold leading-none hover:bg-secondary-300"
                onClick={() => {
                  setErrorMessage("");
                }}
              >
                ⨉
              </button>
            </div>
          )}
          <input
            className={clsx(
              "h-8 w-full rounded-lg bg-secondary-100 pl-1.5 focus:border-0",
              {
                "border-2 border-primary-700": !!errorMessage,
              }
            )}
            value={newTaskName}
            type="text"
            placeholder="New Task"
            onChange={(event) => {
              if (errorMessage) setErrorMessage("");
              setNewTaskName(event.target.value);
            }}
            onFocus={() => {
              if (errorMessage) setErrorMessage("");
            }}
            onBlur={() => {
              if (errorMessage) setErrorMessage("");
            }}
          />
        </form>
      </td>
      <td className="w-fit min-w-[9rem]">
        <Button
          icon="note-x16-tertiary-900"
          variant="tiny"
          intent="primary-light"
          onClick={() => {
            if (validate(newTaskName) === false) return;
            handleAddNewTask(newTaskName);
            setNewTaskName("");
          }}
        >
          Add Task
        </Button>
      </td>
    </tr>
  );
};
