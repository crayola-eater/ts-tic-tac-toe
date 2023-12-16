import { Player } from '../../useTicTacToe/types';

type ScoreProps = {
  players: [Player, Player];
};

export default function Score({ players }: ScoreProps) {
  return (
    <section className="w-full shadow-md p-2 md:p-4 flex flex-col justify-center items-center bg-gray-200 rounded-lg space-y-2">
      <h1 className="w-full text-sm sm:text-lg md:text-xl text-center tracking-widest">Score</h1>
      <table className="w-full border-collapse text-center bg-white" aria-label="Scores">
        <thead>
          <tr>
            {players.map((player) => {
              return (
                <th
                  key={player.icon}
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
                  key={player.icon}
                  className="border border-solid border-gray-400 text-md"
                  aria-label={`Score for player ${player.name} (${player.icon})`}
                >
                  {player.score}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </section>
  );
}
