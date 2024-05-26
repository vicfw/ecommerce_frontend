import UI_Typography from "@/components/ui/typography/UI_Typography";

export const CountDownChildren = ({
  remainingTime,
}: {
  remainingTime: number;
}) => {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return (
    <UI_Typography variant="Medium/Med12">
      {formattedMinutes}:{formattedSeconds}
    </UI_Typography>
  );
};
