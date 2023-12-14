import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Status, { type StatusProps } from './Status';

describe('Status component', () => {
  const testProps: StatusProps = {
    gameHasFinished: true,
    winner: { icon: '👹', name: 'Abe', index: 0, score: 45 },
    currentPlayer: { icon: '🧙', name: 'Agatha', index: 0, score: 5 },
  };

  it('should display an interim/temporary message', async () => {
    render(<Status gameHasFinished={false} winner={null} currentPlayer={undefined} />);
    const status = await screen.findByText('Getting ready, just a moment...');
    expect(status).toBeInTheDocument();
  });

  it('should display whose turn it currently is', async () => {
    const updatedProps = { ...testProps, gameHasFinished: false };
    render(<Status {...updatedProps} />);
    const { name, icon } = updatedProps.currentPlayer!;
    const text = `Waiting for ${name} (${icon})...`;
    const status = await screen.findByText(text);
    expect(status).toBeInTheDocument();
  });

  it('should display the winner', async () => {
    render(<Status {...testProps} />);
    const { name, icon } = testProps.winner!;
    const text = `Game over, ${name} (${icon}) wins!`;
    const status = await screen.findByText(text);
    expect(status).toBeInTheDocument();
  });

  it('should not display a winner', async () => {
    const updatedProps = { ...testProps, winner: null };
    render(<Status {...updatedProps} />);
    const status = await screen.findByText('Game over, nobody won!');
    expect(status).toBeInTheDocument();
  });
});
