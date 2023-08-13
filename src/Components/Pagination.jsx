import React, { memo } from "react";
function BasicPagination(props) {
  console.log("buttons");
  return (
    <div>
      {props.questionOrder.map((val, index) => (
        <button
          className={val.visited ? "blue" : "plain"}
          onClick={() => props.changeQuestion(val.number)}
          key={index}
        >
          {val.number}
        </button>
      ))}
    </div>
  );
}
export default memo(BasicPagination);
