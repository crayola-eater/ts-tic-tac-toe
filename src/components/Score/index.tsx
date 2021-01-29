import React from "react";
import { ScoreProps } from "../../types/Score";

const Score: React.FC<ScoreProps> = ({ players }) => {
  if (0 === players?.length) {
    return null;
  }

  return (
    <div className="shadow-md p-4 flex flex-col justify-center items-center bg-gray-200 rounded-lg w-48 sm:w-72 md:w-96 space-y-2">
      <h1 className="w-full text-xl text-center tracking-widest">Score</h1>
      <table className="w-full border-collapse text-center bg-white">
        <thead>
          <tr>
            {players.map((player) => {
              return (
                <th
                  key={player.index}
                  className="border border-solid border-gray-400 font-normal text-md"
                >
                  {`${player.name} ${player.icon}`}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {players.map((player) => {
              return (
                <td
                  key={player.index}
                  className="border border-solid border-gray-400 text-md"
                >
                  {player.score}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Score;
