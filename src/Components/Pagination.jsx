import React from "react";
function BasicPagination(props) {
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
export default BasicPagination;
