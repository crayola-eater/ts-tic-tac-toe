import { test, expect } from '@playwright/test';

test('player 1 can win', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Select your icon!' })).toBeInViewport();

  // Complete form
  {
    const player1NameInput = page.getByRole('textbox', { name: 'Player 1 name:' });
    await expect(player1NameInput).toHaveValue('Player 1');
    await player1NameInput.fill('Abe');
    await expect(player1NameInput).toHaveValue('Abe');
    const player1IconInput = page.getByRole('combobox', { name: 'Player 1 icon:' });
    await player1IconInput.selectOption('👽');
    await expect(player1IconInput).toHaveValue('👽');

    const player2NameInput = page.getByRole('textbox', { name: 'Player 2 name:' });
    await expect(player2NameInput).toHaveValue('Player 2');
    await player2NameInput.fill('Barbara');
    await expect(player2NameInput).toHaveValue('Barbara');
    const player2IconInput = page.getByRole('combobox', { name: 'Player 2 icon:' });
    await player2IconInput.selectOption('🧛');
    await expect(player2IconInput).toHaveValue('🧛');
    await page.getByRole('button', { name: 'Start game' }).click();
  }

  // Play game
  await expect(page.getByText('Waiting for Abe (👽)...')).toBeInViewport();
  await expect(page.getByRole('heading', { name: 'Score' })).toBeInViewport();
  await expect(page.getByRole('table')).toBeInViewport();
  await expect(page.getByRole('cell', { name: 'Abe 👽' })).toBeInViewport();
  await expect(page.getByRole('cell', { name: 'Barbara 🧛' })).toBeInViewport();

  const player1Score = page.getByLabel('Score for player Abe (👽)');
  await expect(player1Score).toHaveText('0');

  const player2Score = page.getByLabel('Score for player Barbara (🧛)');
  await expect(player2Score).toHaveText('0');

  {
    await expect(page.getByText('Waiting for Abe (👽)...')).toBeInViewport();
    const buttonBeforeClick = page.getByRole('button', { name: 'Select square 1' });
    await expect(buttonBeforeClick).toBeEmpty();
    await buttonBeforeClick.click();
    const buttonAfterClick = page.getByLabel('Square 1 has already been picked by 👽');
    await expect(buttonAfterClick).toHaveText('👽');
    await expect(buttonAfterClick).toBeDisabled();
  }

  {
    await expect(page.getByText('Waiting for Barbara (🧛)...')).toBeInViewport();
    const buttonBeforeClick = page.getByRole('button', { name: 'Select square 2' });
    await expect(buttonBeforeClick).toBeEmpty();
    await buttonBeforeClick.click();
    const buttonAfterClick = page.getByLabel('Square 2 has already been picked by 🧛');
    await expect(buttonAfterClick).toHaveText('🧛');
    await expect(buttonAfterClick).toBeDisabled();
  }

  {
    await expect(page.getByText('Waiting for Abe (👽)...')).toBeInViewport();
    const buttonBeforeClick = page.getByRole('button', { name: 'Select square 4' });
    await expect(buttonBeforeClick).toBeEmpty();
    await buttonBeforeClick.click();
    const buttonAfterClick = page.getByLabel('Square 4 has already been picked by 👽');
    await expect(buttonAfterClick).toHaveText('👽');
    await expect(buttonAfterClick).toBeDisabled();
  }

  {
    await expect(page.getByText('Waiting for Barbara (🧛)...')).toBeInViewport();
    const buttonBeforeClick = page.getByRole('button', { name: 'Select square 9' });
    await expect(buttonBeforeClick).toBeEmpty();
    await buttonBeforeClick.click();
    const buttonAfterClick = page.getByLabel('Square 9 has already been picked by 🧛');
    await expect(buttonAfterClick).toHaveText('🧛');
    await expect(buttonAfterClick).toBeDisabled();
  }

  {
    await expect(page.getByText('Waiting for Abe (👽)...')).toBeInViewport();
    const buttonBeforeClick = page.getByRole('button', { name: 'Select square 7' });
    await expect(buttonBeforeClick).toBeEmpty();
    await buttonBeforeClick.click();
    const buttonAfterClick = page.getByLabel('Square 7 has already been picked by 👽');
    await expect(buttonAfterClick).toHaveText('👽');
    await expect(buttonAfterClick).toBeDisabled();
  }

  await expect(page.getByText('Game over, Abe (👽) wins!')).toBeInViewport();
  await expect(player1Score).toHaveText('1');
  await expect(player2Score).toHaveText('0');
});
