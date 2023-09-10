import { useEffect, useState } from "react";
import { useSessionLog } from "../utils/useSessionLog";

const SessionLog = () => {
  const [taskMessageInput, setTaskMessageInput] = useState<string | null>("");
  const [showTimeWithBreaks, setShowTimeWithBreaks] = useState<boolean>(false);

  const {
    sessionLog,
    newTaskMessage,
    selectedTaskIndex,
    updateSelectedTaskIndex,
    updateNewTaskMessage,
  } = useSessionLog();

  useEffect(() => {
    updateNewTaskMessage(taskMessageInput);
  }, [taskMessageInput, updateNewTaskMessage]);

  return (
    <div className="rounded border-4 border-violet-700 bg-orangeFlavour px-4 py-4">
      <h3 className="text-2xl font-bold text-violet-700">Session Log</h3>
      <div className="mt-4" />
      <>
        <div className="flex h-fit max-h-80 flex-col gap-1 overflow-y-scroll rounded bg-white p-2">
          <div className="flex bg-white py-1 text-left text-neutral-500">
            <div className="w-14">Total Time</div>
            <div className="w-48">Task</div>
            <div className="w-14">Current Session</div>
          </div>
          <div className="flex bg-neutral-100 py-1 text-left">
            <div className="w-14">0.00 h</div>
            <textarea
              value={!newTaskMessage ? "" : newTaskMessage}
              onChange={(event) => {
                setTaskMessageInput(event.target.value);
              }}
              placeholder="New Task"
              className="w-48 border-2 border-neutral-400 bg-neutral-50 px-1"
            />
            <div className="grid w-14 place-content-center">
              <input
                className="scale-125"
                id="active-session--1"
                type="radio"
                name="active-session"
                checked={selectedTaskIndex === -1}
                onChange={() => {
                  updateSelectedTaskIndex(-1);
                }}
              />
            </div>
          </div>
          {sessionLog.map((entry, index) => (
            <div key={index} className="flex py-1 text-left odd:bg-neutral-100">
              <div className="w-14">
                {!showTimeWithBreaks &&
                  `${Math.round((entry.minutes / 60) * 100) / 100} h`}
                {!!showTimeWithBreaks &&
                  `${Math.round((entry.minutesWithBreaks / 60) * 100) / 100} h`}
              </div>
              <div className="w-48">{entry.message}</div>
              <div className="grid w-14 place-content-center">
                <input
                  className="scale-125"
                  id={`active-session-${index}`}
                  type="radio"
                  name="active-session"
                  checked={selectedTaskIndex === index}
                  onChange={() => {
                    updateSelectedTaskIndex(index);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2" />
        <div className="flex flex-row-reverse gap-2">
          <label>Include break time</label>
          <input
            className="scale-150"
            type="checkbox"
            checked={showTimeWithBreaks}
            onChange={(event) => setShowTimeWithBreaks(event.target.checked)}
          />
        </div>
      </>
    </div>
  );
};

export default SessionLog;
