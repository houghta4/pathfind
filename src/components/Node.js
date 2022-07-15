import React from "react";
import "../css/Node.css";

const Node = ({ isStart, isEnd, isWall, row, col }) => {
    const nodeType = isStart ? "node-start" : isEnd ? "node-end" : isWall ? "node-wall" : "";
    return(
        <div className={`node ${nodeType}`} id={`node-${row}-${col}`}></div>
    );
};

export default Node;