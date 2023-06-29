interface Props {
  startTime: number;
  minutes: number;
}

const getElapsedTime: ({ startTime, minutes }: Props) => {
  elapsedTime: number;
  elapsedMinutes: number;
  elapsedSeconds: number;
  timeLeft: number;
} = ({ startTime, minutes }) => {
  const currentTime = Date.now();
  const elapsedTime = Math.floor((currentTime - startTime) / 1000);

  const timeLeft = 60 * minutes - elapsedTime;

  const elapsedMinutes = Math.floor(timeLeft / 60);
  const elapsedSeconds = timeLeft % 60;

  return { elapsedTime, elapsedMinutes, elapsedSeconds, timeLeft };
};

export default getElapsedTime;
