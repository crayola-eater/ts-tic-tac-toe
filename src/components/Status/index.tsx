import clsx from "clsx";
import React from "react";
import { StatusProps } from "../../types/Status";

const Status: React.FC<StatusProps> = ({
  currentPlayer,
  gameHasFinished,
  winner,
}) => {
  let statusMessage;
  if (gameHasFinished) {
    statusMessage = winner
      ? `Game over, ${winner.name} (${winner.icon}) wins!`
      : "Game over, nobody won!";
  } else if (currentPlayer) {
    statusMessage = `Waiting for ${currentPlayer.name} (${currentPlayer.icon})...`;
  } else {
    statusMessage = "Getting ready, just a moment...";
  }

  return (
    <div
      className={clsx(
        "w-full",
        "flex flex-col items-center justify-center",
        "bg-gray-200",
        "rounded-lg"
      )}
    >
      <span
        className={clsx(
          "p-2 md:p-4",
          "font-sans",
          "text-center",
          "text-sm sm:text-lg md:text-xl",
          "tracking-widest"
        )}
      >
        {statusMessage}
      </span>
    </div>
  );
};

export default Status;
