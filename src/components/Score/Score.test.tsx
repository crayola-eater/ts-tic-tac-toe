import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Score from './Score';

describe('Score component', () => {
  const players = [
    {
      index: 0,
      icon: '⚰️',
      name: 'APASDJPASD',
      score: 4,
    },
    {
      index: 1,
      icon: '👽',
      name: 'TASDJPAOS',
      score: 7,
    },
  ];

  it('should display the heading', async () => {
    render(<Score players={players} />);
    const heading = await screen.findByRole('heading', { name: 'Score' });
    expect(heading).toBeInTheDocument();
  });

  it('should display all players and scores in correct order', async () => {
    render(<Score players={players} />);

    const tableHeaders = await screen.findAllByRole('columnheader');
    expect(tableHeaders).to.have.length(players.length);

    const tableCells = await screen.findAllByRole('cell');
    expect(tableCells).to.have.length(players.length);

    for (const [i, player] of players.entries()) {
      expect(tableHeaders[i]).toHaveTextContent(`${player.name} ${player.icon}`);
      expect(tableCells[i]).toHaveTextContent(player.score.toString(10));
    }
  });

  it('should render nothing if there are no players', async () => {
    const { container } = render(<Score players={[]} />);
    expect(container).toBeEmptyDOMElement();

    const heading = screen.queryByRole('heading', { name: 'Score' });
    expect(heading).toBeNull();
  });
});
