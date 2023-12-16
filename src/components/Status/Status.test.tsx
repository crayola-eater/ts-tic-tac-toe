import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Status from './Status';

describe('Status component', () => {
  it('should display an interim/temporary message', async () => {
    render(<Status status="NOT_STARTED" winner={null} currentPlayer={null} />);
    const status = await screen.findByText('Getting ready, just a moment...');
    expect(status).toBeInTheDocument();
  });

  it('should display whose turn it currently is when game is in progress', async () => {
    render(
      <Status
        status="IN_PROGRESS"
        winner={null}
        currentPlayer={{ icon: '👾', name: 'Barbara', score: 3 }}
      />,
    );
    const status = await screen.findByText('Waiting for Barbara (👾)...');
    expect(status).toBeInTheDocument();
  });

  it('should display the winner when game has finished and there is a winner', async () => {
    render(
      <Status
        status="FINISHED"
        currentPlayer={null}
        winner={{ icon: '🧟', name: 'Abe', score: 7 }}
      />,
    );
    const status = await screen.findByText('Game over, Abe (🧟) wins!');
    expect(status).toBeInTheDocument();
  });

  it('should not display a winner when game has finished and there is not a winner', async () => {
    render(<Status status="FINISHED" currentPlayer={null} winner={null} />);
    const status = await screen.findByText('Game over, nobody won!');
    expect(status).toBeInTheDocument();
  });
});
