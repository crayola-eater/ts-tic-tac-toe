import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Score from './Score';

describe('Score component', () => {
  const player1 = {
    index: 0,
    icon: '⚰️',
    name: 'APASDJPASD',
    score: 4,
  };

  const player2 = {
    index: 1,
    icon: '👽',
    name: 'TASDJPAOS',
    score: 7,
  };

  it('should display the heading', async () => {
    render(<Score players={[player1, player2]} />);
    const heading = await screen.findByRole('heading', { name: 'Score' });
    expect(heading).toBeInTheDocument();
  });

  it('should display all players and scores in correct order', async () => {
    render(<Score players={[player1, player2]} />);

    const tableHeaders = await screen.findAllByRole('columnheader');
    expect(tableHeaders).to.have.length(2);

    const tableCells = await screen.findAllByRole('cell');
    expect(tableCells).to.have.length(2);

    for (const [i, player] of [player1, player2].entries()) {
      expect(tableHeaders[i]).toHaveTextContent(`${player.name} ${player.icon}`);
      expect(tableCells[i]).toHaveTextContent(player.score.toString(10));
    }
  });
});
