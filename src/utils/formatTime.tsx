export const formatTime = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  const padNumber = (ISO8601Time: number) => {
    return ISO8601Time.toString().padStart(2, "0");
  };

  return `${padNumber(minutes)}:${padNumber(seconds)}`;
};

export const formatTimeVerbose = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  const addUnit = (value: number, unit: string) => {
    return `${value}${unit} `;
  };

  const formattedTime =
    (hours > 0 ? addUnit(hours, "h") : "") +
    addUnit(minutes, "min") +
    (hours === 0 ? addUnit(seconds, "sec") : "");

  return formattedTime.trim() || "0sec";
};
