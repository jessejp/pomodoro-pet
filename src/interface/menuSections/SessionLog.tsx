import {
  Row,
  RowSelectionState,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { Log } from "../../store/types";
import { useBoundStore } from "../../store/useBoundStore";
import { LogTimer } from "../timer/LogTimer";
import Button from "../ui/Button";

export const SessionLog = () => {
  console.count("SessionLog.tsx");

  const { sessionLog, createLog, updateSessionLog, isRunning } = useBoundStore(
    (state) => ({
      isRunning: state.isRunning,
      sessionLog: state.sessionLog,
      createLog: state.createLog,
      updateSessionLog: state.updateSessionLog,
    }),
  );

  const [data, setData] = useState<Log[]>(() => [...sessionLog]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const columnHelper = createColumnHelper<Log>();
  const lastSec = useRef<Log>();
  const tableLength = useRef<number>(0);

  const saveUpdatedSeconds = useMemo(
    () => (sec: number, row: Row<Log>, allowSaving: boolean) => {
      const { task, taskTimeSeconds: ogSecs } = row.original;

      if (
        !lastSec.current ||
        lastSec.current.task !== task ||
        (lastSec.current?.task === task && sec !== ogSecs)
      )
        lastSec.current = { task, taskTimeSeconds: sec };

      if (!allowSaving && isRunning) return;

      updateSessionLog({
        task,
        taskTimeSeconds: lastSec.current.taskTimeSeconds + 1,
      });
    },
    [updateSessionLog, isRunning],
  );

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
            saveUpdatedSeconds={(sec) => {
              saveUpdatedSeconds(sec, info.row, !info.row.getIsSelected());
            }}
          />
        ),
        footer: (info) => info.column.id,
      }),
    ],
    [columnHelper, saveUpdatedSeconds],
  );

  const table = useReactTable({
    data,
    columns,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    state: {
      sorting,
    },
    getRowId: (row) => row.task,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: false,
  });

  useEffect(() => {
    setData(sessionLog);
  }, [sessionLog]);

  useEffect(() => {
    const rows = table.getRowModel().rows;
    const lastRow = rows[rows.length - 1];
    
    if (lastRow && rows.length > tableLength.current) {
      tableLength.current += 1; 
      lastRow.toggleSelected();
    }
  }, [data, table, tableLength]);

  const handleAddNewTask = (task: string) => {
    const newRow: Log = { task, taskTimeSeconds: 0 };
    createLog(newRow);
    table.resetRowSelection();
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
                  "cursor-pointer select-none text-end":
                    header.column.getCanSort(),
                  "w-full": header.column.columnDef.header === "Task Name",
                  "w-36": header.column.columnDef.header === "Work Time",
                })}
                onClick={header.column.getToggleSortingHandler()}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
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
      className={clsx("flex cursor-pointer gap-8 px-8 py-2", {
        "bg-primary-100 shadow-none transition-shadow duration-700 hover:shadow-innerBlur hover:shadow-primary-200":
          !isRowSelected,
        "bg-primary-200 font-semibold": isRowSelected,
      })}
      role="radio"
      onClick={() => row.toggleSelected()}
    >
      {row.getVisibleCells().map((cell) => {
        return (
          <td
            key={cell.id}
            className={clsx("relative flex items-center", {
              "w-full overflow-hidden": cell.column.id === "taskName",
              "w-36 justify-end": cell.column.id === "taskTimeSeconds",
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
      <td className="w-fit min-w-[9rem] flex justify-end">
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
