export interface StartMenuProps {
  handleStart: (data: StartMenuFormData) => void;
}

export interface StartMenuFormData {
  player1Name: string;
  player1Icon: string;
  player2Name: string;
  player2Icon: string;
}
