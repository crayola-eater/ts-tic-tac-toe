import { useForm } from 'react-hook-form';
import { HandleStart, PlayerCreationOptions } from '../../useTicTacToe/types';

export type StartMenuProps = {
  handleStart: HandleStart;
};

export type StartMenuFormData = {
  player1Name: string;
  player1Icon: string;
  player2Name: string;
  player2Icon: string;
};

const allIcons = (
  [
    '🧟',
    '☠️',
    '⚰️',
    '🎃',
    '👻',
    '👹',
    '🤡',
    '💀',
    '👾',
    '👺',
    '👽',
    '🧙',
    '🧛',
    '👸',
    '🧡',
  ] as const
).map((icon, i) => {
  return {
    icon,
    id: i,
  };
});

export default function StartMenu({ handleStart }: StartMenuProps) {
  const { register, handleSubmit } = useForm<PlayerCreationOptions>();

  return (
    <>
      <h1 className="text-center text-3xl p-2 tracking-wider">Select your icon!</h1>
      <form
        className="flex flex-col justify-center items-center space-y-3 w-11/12 sm:w-96 tracking-wider"
        onSubmit={handleSubmit((data) => {
          const players: PlayerCreationOptions = [data[0], data[1]];
          handleStart(players);
        })}
      >
        {([0, 1] as const).map((i) => {
          return (
            <fieldset
              className="w-full flex flex-col justify-center items-center rounded-lg bg-gray-200 p-4 space-y-3"
              key={i}
            >
              <span className="w-full text-lg border-b border-solid border-gray-400 pb-1">{`Player ${
                i + 1
              }`}</span>
              <label className="w-full flex flex-col justify-center items-center space-y-1">
                <span className="w-full text-gray-600 text-xs">{`Player ${i + 1} name:`}</span>
                <input
                  className="w-full rounded-sm p-1"
                  {...register(`${i}.name`, {
                    required: 'Please enter a name',
                    pattern: /\S+/,
                  })}
                  type="text"
                  placeholder="Enter name..."
                  maxLength={10}
                  defaultValue={`Player ${i + 1}`}
                />
              </label>
              <label className="w-full flex flex-col justify-center items-center space-y-1">
                <span className="w-full text-gray-600 text-xs">{`Player ${i + 1} icon:`}</span>
                <select
                  className="w-full rounded-sm p-1"
                  {...register(`${i}.icon`, {
                    required: true,
                  })}
                  defaultValue={allIcons[i].icon}
                >
                  <option disabled value="">
                    Select a character
                  </option>
                  {allIcons.map(({ icon, id }) => {
                    return (
                      <option value={icon} key={id}>
                        {icon}
                      </option>
                    );
                  })}
                </select>
              </label>
            </fieldset>
          );
        })}
        <button className="bg-gray-200 hover:bg-green-700 hover:text-white p-3 rounded-md tracking-wider text-md">
          Start game
        </button>
      </form>
    </>
  );
}
