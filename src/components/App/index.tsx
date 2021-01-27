import React from "react";
import "tailwindcss/tailwind.css";

const App: React.VFC = () => {
  return (
    <h1 className="bg-red-600">
      My React and TypeScript App!😊{new Date().toJSON()}
    </h1>
  );
};

export default App;
