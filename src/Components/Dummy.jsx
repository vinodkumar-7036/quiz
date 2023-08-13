import React, { memo } from "react";

const Dummy = (props) => {
  console.log("Re rendered");
  return (
    <div>
      <h1>Hi</h1>
      <button onClick={props.displayDummy}>Click here</button>
    </div>
  );
};

export default memo(Dummy);
