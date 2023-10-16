import { useBoundStore } from "../store/useBoundStore";

const SessionLog = () => {
  // const [showTimeWithBreaks, setShowTimeWithBreaks] = useState<boolean>(false);
  const {
    newTaskMessage,
    sessionLog,
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
      <div className="flex h-5/6 w-full flex-col gap-3">
        <div className="grid h-8 grid-cols-sessionlog gap-3 text-sm">
          <div>Length</div>
          <div className="pl-1">Task Name</div>
          <div>Active Task</div>
        </div>
        <div className="flex h-fit max-h-24 flex-col gap-3 overflow-y-scroll text-md scrollbar-thin scrollbar-thumb-tertiary-300 scrollbar-thumb-rounded-lg">
          {sessionLog.map((entry, index) => {
            const logTime = Math.round((entry.minutes / 60) * 100) / 100;
            return (
              <div
                key={index}
                className="grid grid-cols-sessionlog items-center gap-3"
              >
                <div>{`${logTime === 0 ? "0.00" : logTime} h`}</div>
                <div className="pl-1">{entry.message}</div>
                <label htmlFor={`active-session-${index}`}>
                  <input
                    className="grid h-8 w-8 appearance-none
                              place-content-center rounded-full bg-secondary-100 before:h-4 before:w-4 before:scale-0 before:rounded-full before:shadow-radioButtonInset before:shadow-tertiary-600 before:transition-transform before:content-[''] checked:before:scale-100"
                    id={`active-session-${index}`}
                    type="radio"
                    name={`active-session-${index}`}
                    checked={selectedTaskIndex === index}
                    autoFocus={selectedTaskIndex === index}
                    onChange={() => {
                      updateSelectedTaskIndex(index);
                    }}
                  />
                </label>
              </div>
            );
          })}
        </div>
        <div className="grid h-8 grid-cols-sessionlog gap-3 text-md">
          <div>0.00&nbsp;h</div>
          <input
            className="h-8 rounded-lg bg-secondary-100 pl-1"
            type="text"
            placeholder="New Task"
            value={newTaskMessage}
            onFocus={() => {
              updateSelectedTaskIndex(-1);
            }}
            onChange={(event) => {
              updateNewTaskMessage(event.target.value);
            }}
          />
          <label htmlFor="active-session--1">
            <input
              className="grid h-8 w-8 scale-100 appearance-none
              place-content-center rounded-full bg-secondary-100 before:h-4 before:w-4 before:scale-0 before:rounded-full before:shadow-radioButtonInset before:shadow-tertiary-600 before:transition-transform before:content-[''] checked:before:scale-100"
              id="active-session--1"
              type="radio"
              name="active-session"
              checked={selectedTaskIndex === -1}
              onChange={() => {
                updateSelectedTaskIndex(-1);
              }}
            />
          </label>
        </div>
      </div>
      {/* <div className="flex h-1/6 flex-row-reverse items-center justify-start gap-2 py-2">
        <label>Include break time</label>
        <input
          className="scale-150"
          type="checkbox"
          checked={showTimeWithBreaks}
          onChange={(event) => setShowTimeWithBreaks(event.target.checked)}
        />
      </div> */}
    </>
  );
};

export default SessionLog;
