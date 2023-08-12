import React, { createContext } from "react";
import Quiz from "../src/Components/Quiz";
import Submit from "./Components/Submit";

import { Switch, Route } from "react-router-dom";
import { useState } from "react";
export const scoreContext = createContext(0);
function App() {
  const [score, setScore] = useState(0);
  console.log(":::::>", score);
  return (
    // <scoreContext.Provider value={{ score, setScore }}>
    <div>
      <Switch>
        <Route exact path="/" component={Quiz} />
        <Route exact path="/submit" component={Submit} />
      </Switch>
    </div>
    // </scoreContext.Provider>
  );
}

export default App;
