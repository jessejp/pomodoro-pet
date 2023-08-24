import { usePomodoro } from "../utils/usePomodoro";

const DUMMY_sessionlist = [
  { message: "Developing Pomodoro Pets", minutes: 85 },
  { message: "Practising Piano", minutes: 60 },
  { message: "Really long task name that I hadasessionfor", minutes: 30 },
  {
    message:
      "JIRATIK-4143 Develop new session log for pomodoro pets to track time and tasks",
    minutes: 140,
  },
];

const SessionLog = () => {
  const { isRunning } = usePomodoro();

  if (!isRunning) return null;
  return (
    <div className="fixed bottom-1/3 right-5 z-10 w-80 rounded border-4 border-violet-700 bg-orangeFlavour px-4 py-4">
      <h3 className="text-2xl font-bold text-violet-700">Session Log</h3>
      <div className="mt-4" />
      <div className="flex flex-col gap-1 rounded bg-white p-2">
        <div className="flex bg-neutral-100 text-left">
          <div className="w-14">0.00 h</div>
          <textarea
            placeholder="Current Session"
            className="w-48 border-2 border-neutral-400 bg-neutral-50 px-1"
          />
        </div>
        {DUMMY_sessionlist.map((entry) => (
          <div className="flex text-left odd:bg-neutral-100">
            <div className="w-14">
              {Math.round((entry.minutes / 60) * 100) / 100} h
            </div>
            <div className="w-48">{entry.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionLog;
