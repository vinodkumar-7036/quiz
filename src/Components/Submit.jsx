import React from "react";
// import { useContext } from "react";
// import { scoreContext } from "../App";

import { useSelector } from "react-redux";

function Submit() {
  //   const { score } = useContext(scoreContext);
  const score = useSelector((state) => state.score.value);

  return (
    <div>
      <div>Thank Your Score is {score}</div>
    </div>
  );
}

export default Submit;
