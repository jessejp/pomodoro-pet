import { usePomodoro } from "../utils/usePomodoro";
import Draggable from "./components/Draggable";

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
    <Draggable>
      <div className="z-10 w-96 rounded border-4 border-violet-700 bg-orangeFlavour px-4 py-4">
        <div className="absolute left-5 top-5 text-2xl pointer-events-none">📝</div>
        <h3 className="text-2xl font-bold text-violet-700">Session Log</h3>
        <div className="mt-4" />
        <div className="flex h-fit max-h-80 flex-col gap-1 overflow-y-scroll rounded bg-white p-2">
          <div className="flex bg-white py-1 text-left text-neutral-500">
            <div className="w-14">Time Done</div>
            <div className="w-48">Task</div>
            <div className="w-14">Current Session</div>
          </div>
          <div className="flex bg-neutral-100 py-1 text-left">
            <div className="w-14">0.00 h</div>
            <textarea
              placeholder="Current Session"
              className="w-48 border-2 border-neutral-400 bg-neutral-50 px-1"
            />
            <div className="grid w-14 place-content-center">
              <input
                id="active-session-new"
                type="radio"
                name="active-session"
                defaultChecked
              />
            </div>
          </div>
          {DUMMY_sessionlist.map((entry, index) => (
            <div key={index} className="flex py-1 text-left odd:bg-neutral-100">
              <div className="w-14">
                {Math.round((entry.minutes / 60) * 100) / 100} h
              </div>
              <div className="w-48">{entry.message}</div>
              <div className="grid w-14 place-content-center">
                <input
                  id={`active-session-${index}`}
                  type="radio"
                  name="active-session"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Draggable>
  );
};

export default SessionLog;
