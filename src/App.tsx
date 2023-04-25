import React from "react";
import Counter from "./features/counter/Counter";
import { Apod } from "./features/apod/apod";

function App(): JSX.Element {
  return (
    <div className="App">
      {/* <Counter /> */}
      <Apod />
    </div>
  );
}

export default App;
