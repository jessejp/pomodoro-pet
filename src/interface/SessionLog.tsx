import { useState } from "react";
import { useBoundStore } from "../store/useBoundStore";

const SessionLog = () => {
  const [taskMessageInput, setTaskMessageInput] = useState<string>("");
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

  return (
    <>
      <div className="flex h-5/6 w-full flex-col overflow-y-scroll">
        <div className="grid h-8 grid-cols-sessionlog gap-3 text-sm">
          <div>Length</div>
          <div>Task Name</div>
          <div>Active Task</div>
        </div>
        <div className="grid h-8 grid-cols-sessionlog gap-3">
          <div>0.00 h</div>
          <input
            className="rounded-lg bg-secondary-100"
            type="text"
            placeholder="New Task"
            onChange={(event) => {
              setTaskMessageInput(event.target.value);
            }}
          />
          <input
            className="bg-secondary-100 accent-tertiary-500"
            id="active-session--1"
            type="radio"
            name="active-session"
            checked={selectedTaskIndex === -1}
            onChange={() => {
              updateSelectedTaskIndex(-1);
            }}
          />
        </div>
        {sessionLog.map((entry, index) => (
          <div key={index} className="grid h-8 grid-cols-sessionlog gap-3">
            <div className="w-14">
              {!showTimeWithBreaks &&
                `${Math.round((entry.minutes / 60) * 100) / 100} h`}
              {!!showTimeWithBreaks &&
                `${Math.round((entry.minutesWithBreaks / 60) * 100) / 100} h`}
            </div>
            <div>{entry.message}</div>
            <div>
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
