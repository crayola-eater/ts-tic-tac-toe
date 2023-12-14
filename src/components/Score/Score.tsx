import { Player } from '../../hooks/usePlayersManager';

type ScoreProps = {
  players: Player[];
};

export default function Score({ players }: ScoreProps) {
  if (0 === players?.length) {
    return null;
  }

  return (
    <div className="w-full shadow-md p-2 md:p-4 flex flex-col justify-center items-center bg-gray-200 rounded-lg space-y-2">
      <h1 className="w-full text-sm sm:text-lg md:text-xl text-center tracking-widest">Score</h1>
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
                <td key={player.index} className="border border-solid border-gray-400 text-md">
                  {player.score}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
