import React, {useState, useEffect} from "react";
import Node from "./Node";
import "../css/Pathfind.css"


// TODO user selected size
const rows = 10;
const cols = 25;


// TODO user selected start and end
const NODE_START_ROW = 0,
    NODE_START_COL = 0,
    NODE_END_ROW = rows - 1,
    NODE_END_COL = cols - 1;


const PathFind = () => {
    const [matrix, setMatrix] = useState([]);



    // similar to componentDidMount();
    useEffect(() => {
        setMatrix(createMatrix);
    }, [])


    const createNode = (row, col) => {
        return {
            row,
            col,
            isStart : row === NODE_START_ROW && col === NODE_START_COL,
            isEnd : row === NODE_END_ROW && col === NODE_END_COL,
            dist : Infinity,
            isVisited : false,
            isWall : false,
            weight : 0,
            prevNode: null,
        };
    };

    const createMatrix = () => {
        const matrix = [];
        for(let i = 0; i < rows; i++){
            const newRow = [];
            for(let j = 0; j < cols; j++){
                newRow.push(createNode(i, j));
            }
            matrix.push(newRow);
        }
        return matrix;
    }

    //matrix with nodes
    const matrixWithNodes = (
        <div>
            {matrix.map((row, i) => {
                return (
                    <div key={i} className="rowContainer">
                        {row.map((col, j) => {
                            const {isStart, isEnd, isWall} = col;
                            return (
                                <Node 
                                    key={j}
                                    row={i}
                                    col={j}
                                    isStart={isStart}
                                    isEnd={isEnd}
                                    isWall={isWall}
                                ></Node>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
    console.log(matrix);
    return (
        <div className="PathFindContainer">
            <h1>Pathfind Component</h1>
            {matrixWithNodes}
        </div>
    );
};

export default PathFind;