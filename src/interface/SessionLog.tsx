import { useEffect, useState } from "react";
import { useBoundStore } from "../store/useBoundStore";

const SessionLog = () => {
  const [taskMessageInput, setTaskMessageInput] = useState<string | null>("");
  const [showTimeWithBreaks, setShowTimeWithBreaks] = useState<boolean>(false);

  const {
    sessionLog,
    newTaskMessage,
    selectedTaskIndex,
    updateSelectedTaskIndex,
    updateNewTaskMessage,
  } = useBoundStore((state) => ({
    sessionLog: state.sessionLog,
    newTaskMessage: state.newTaskMessage,
    selectedTaskIndex: state.selectedTaskIndex,
    updateSelectedTaskIndex: state.updateSelectedTaskIndex,
    updateNewTaskMessage: state.updateNewTaskMessage,
  }));

  useEffect(() => {
    updateNewTaskMessage(taskMessageInput);
  }, [taskMessageInput, updateNewTaskMessage]);

  return (
    <>
      <div className="flex h-5/6 w-full flex-col overflow-y-scroll rounded bg-white p-2">
        <div className="flex py-1 text-left text-neutral-500 odd:bg-neutral-100">
          <div className="w-14">Total Time</div>
          <div className="w-48 grow">Task</div>
          <div className="w-20">Current Session</div>
        </div>
        <div className="flex py-1 text-left odd:bg-neutral-100">
          <div className="w-14">0.00 h</div>
          <textarea
            value={!newTaskMessage ? "" : newTaskMessage}
            onChange={(event) => {
              setTaskMessageInput(event.target.value);
            }}
            placeholder="New Task"
            className="w-48 grow border-2 border-neutral-400 bg-neutral-50 px-1"
          />
          <div className="grid w-20 place-content-center">
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
            <div className="w-48 grow">{entry.message}</div>
            <div className="grid w-20 place-content-center">
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
      <div className="flex h-1/6 flex-row-reverse items-center justify-start gap-2 py-2">
        <label>Include break time</label>
        <input
          className="scale-150"
          type="checkbox"
          checked={showTimeWithBreaks}
          onChange={(event) => setShowTimeWithBreaks(event.target.checked)}
        />
      </div>
    </>
  );
};

export default SessionLog;
