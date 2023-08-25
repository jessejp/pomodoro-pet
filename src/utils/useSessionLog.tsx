import { create } from "zustand";

type Log = {
  message: string | null;
  minutes: number;
};

interface SessionLog {
  sessionLog: Log[];
  updateSessionLog: (log: string, minutes: number) => void;
}

const useSessionLog = create<SessionLog>((set) => {
  return {
    sessionLog: [],
    updateSessionLog: (log, minutes) => {
      set(({ sessionLog }) => {
        return {
          sessionLog: [...sessionLog, { message: log, minutes: minutes }],
        };
      });
    },
  };
});

export default useSessionLog;
