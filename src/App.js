import React from "react";
import PathFind from "./components/Pathfind";
import Header from "./components/Header";
import { useState } from "react";

const App = () => {
  const [theme, setTheme] = useState("light");
  return (
    <div className={
      theme === "light" ? "container-fluid light" : "container-fluid dark"
    }>
      <Header theme={theme} setTheme={setTheme} />
      <PathFind />
    </div>
  );
};

export default App;
