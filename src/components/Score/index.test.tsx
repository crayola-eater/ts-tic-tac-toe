import React from "react";
import { render } from "@testing-library/react";
import Score from ".";

describe("Score component", () => {
  const players = [
    {
      index: 0,
      icon: "⚰️",
      name: "APASDJPASD",
      score: 4,
    },
    {
      index: 1,
      icon: "👽",
      name: "TASDJPAOS",
      score: 7,
    },
  ];

  it("should display the heading", () => {
    const { getByText } = render(<Score players={players} />);
    expect(getByText("Score")).toBeInTheDocument();
  });

  it("should display all players", () => {
    const { getByText } = render(<Score players={players} />);
    players.forEach((player) => {
      expect(getByText(`${player.name} ${player.icon}`)).toBeInTheDocument();
    });
  });

  it("should display all scores", () => {
    const { getByText } = render(<Score players={players} />);
    players.forEach((player) => {
      expect(getByText(player.score)).toBeInTheDocument();
    });
  });

  it("should not render if there are no players", () => {
    const { container } = render(<Score players={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
