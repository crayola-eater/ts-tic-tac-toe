# Purpose

- A Tic-tac-toe game which allows 2 human players to play against each other.

![Tic-tac-toe game](/meta/game-recording.gif)

# How to run

- Clone this repo
- For minimal setup, open repository with VS Code Dev Containers extension (requires Docker)
- `npm dev` to run the game locally

# Other commands

- `npm run build` to build locally
- `npm test` to run tests

# Tools used

- Core application
  - React
  - TypeScript
  - Tailwind CSS
- Bundling
  - Webpack originally (then changed to Vite later)
- Testing
  - Jest
  - React testing library

# What I learned

- Practiced creating custom React hooks to abstract away and encapsulate business logic.
- By delegating application logic to custom hooks, we can end up with leaner, cleaner components.
- This pattern also allows us to separate data/model from its presentation.
- Practiced OOP concepts like **state** and **behaviour**.
- Practiced making use of TypeScript to:
  - think about interfaces and function signatures upfront
  - introduce type safety within a project
  - identify and fix type mismatches/bugs that can be caught during development
  - having a better, more productive developer experience (greater intellisense/autocomplete, IDE behaviour)
- Practiced writing tests with Jest and React testing library to ensure components and hooks were behaving correctly
- Practiced configuring Webpack for different environments (`dev`, `prod`).
- Practiced setting up tooling (ESLint, Babel, Tailwind CSS, PostCSS) and loaders.
- Used Tailwind CSS for the first time and found it to be an interesting tool that helped in creating a responsive design for this project.

# Things to add

- A computer "player" that makes moves based on some configurable difficulty level:
  - `EASY` - randomly picks a square
  - `HARD` - picks a square based on a winning algorithm/strategy
  - `MEDIUM` - alternates between `EASY` and `HARD`
- A reset game button (separate from the auto-restart functionality already implemented)
- Animations for different "events" within a game's lifecycle (e.g. game starts, player wins a game, etc.)

# Created

- Jan 2021
