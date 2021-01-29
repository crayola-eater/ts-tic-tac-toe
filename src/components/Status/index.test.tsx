import React from "react";
import { render } from "@testing-library/react";
import Status from ".";

describe("Status component", () => {
  const testProps = {
    gameHasFinished: true,
    winner: { icon: "👹", name: "Abe", index: 0, score: 45 },
    currentPlayer: { icon: "🧙", name: "Agatha", index: 0, score: 5 },
  };

  it("should display an interim/temporary message", () => {
    const { getByText } = render(
      <Status {...({ gameHasFinished: false } as any)} />
    );
    expect(getByText("Getting ready, just a moment...")).toBeInTheDocument();
  });

  it("should display whose turn it currently is", () => {
    const {
      currentPlayer: { name, icon },
    } = testProps;
    const { getByText } = render(
      <Status {...{ ...testProps, gameHasFinished: false }} />
    );
    expect(getByText(`Waiting for ${name} (${icon})...`)).toBeInTheDocument();
  });

  it("should display the winner", () => {
    const {
      winner: { name, icon },
    } = testProps;
    const { getByText } = render(<Status {...testProps} />);
    expect(getByText(`Game over, ${name} (${icon}) wins!`)).toBeInTheDocument();
  });

  it("should not display a winner", () => {
    const { getByText } = render(
      <Status {...{ ...testProps, winner: null }} />
    );
    expect(getByText("Game over, nobody won!")).toBeInTheDocument();
  });
});
