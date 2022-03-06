import React from "react";
import { useForm } from "react-hook-form";
import { StartMenuFormData, StartMenuProps } from "../../types/StartMenu";

const allIcons = [
  "🧟",
  "☠️",
  "⚰️",
  "🎃",
  "👻",
  "👹",
  "🤡",
  "💀",
  "👾",
  "👺",
  "👽",
  "🧙",
  "🧛",
  "👸",
  "🧡",
].map((icon, i) => {
  return {
    icon,
    id: i,
  };
});

const StartMenu: React.FC<StartMenuProps> = ({ handleStart }) => {
  const { register, handleSubmit } = useForm<StartMenuFormData>();

  return (
    <>
      <h1 className="text-center text-3xl p-2 tracking-wider">
        Select your icon!
      </h1>
      <form
        className="flex flex-col justify-center items-center space-y-3 w-11/12 sm:w-96 tracking-wider"
        onSubmit={handleSubmit(handleStart)}
      >
        {Array.from({ length: 2 }, (_, i) => {
          const nameId =
            i === 0 ? ("player1Name" as const) : ("player2Name" as const);
          const iconId =
            i === 0 ? ("player1Icon" as const) : ("player2Icon" as const);
          return (
            <fieldset
              className="w-full flex flex-col justify-center items-center rounded-lg bg-gray-200 p-4 space-y-3"
              key={i}
            >
              <span className="w-full text-lg border-b border-solid border-gray-400 pb-1">{`Player ${
                i + 1
              }`}</span>
              <label
                className="w-full flex flex-col justify-center items-center space-y-1"
                htmlFor={nameId}
              >
                <span className="w-full text-gray-600 text-xs">{`Player ${
                  i + 1
                } name:`}</span>
                <input
                  className="w-full rounded-sm p-1"
                  {...register(nameId, {
                    required: "Please enter a name",
                    pattern: /\S+/,
                  })}
                  type="text"
                  placeholder="Enter name..."
                  defaultValue={`Player ${i + 1}`}
                />
              </label>
              <label
                className="w-full flex flex-col justify-center items-center space-y-1"
                htmlFor={iconId}
              >
                <span className="w-full text-gray-600 text-xs">{`Player ${
                  i + 1
                } icon:`}</span>
                <select
                  className="w-full rounded-sm p-1"
                  id={iconId}
                  {...register(iconId, {
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
        <button className="bg-gray-200 hover:bg-gray-400 hover:bg-green-700 hover:text-white p-3 rounded-md tracking-wider text-md">
          Start game
        </button>
      </form>
    </>
  );
};

export default StartMenu;
