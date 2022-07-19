import React from "react";
import "../css/Node.css";

const Node = ({ isStart, isEnd, isWall, row, col, onMouseEnter, onMouseDown, onMouseUp }) => {
    const nodeType = isStart ? "node-start" : isEnd ? "node-end" : isWall ? "node-wall" : "";
    return(
        <div 
            className={`node ${nodeType}`} 
            id={`node-${row}-${col}`}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseDown={() => onMouseDown(row,col)}
            onMouseUp={() => onMouseUp()}></div>
    );
};

export default Node;