import { useState } from "react";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

type Log = {
  task: string;
  taskTimeSeconds: number;
};

const DUMMY_DATA: Log[] = [
  {
    task: "Writing documentation",
    taskTimeSeconds: 7200, // 2h 0min
  },
  {
    task: "code feat-style-session-log-v2",
    taskTimeSeconds: 60 * 60 * 1 + 60 * 5, // 1h 5min
  },
  {
    task: "Designing Session Log V2",
    taskTimeSeconds: 60 * 30 + 35, // 30min 35sec
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
  const [data, setData] = useState<Log[]>(() => [...DUMMY_DATA]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log(table);

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
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
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SessionLog;
