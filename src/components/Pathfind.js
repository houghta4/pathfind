import React, {useState, useEffect} from "react";
import Node from "./Node";
import Astar from "../algs/astar";
import "../css/Pathfind.css"


//TODO reset matrix on buttonclick to account for user selected walls?

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
    const [path, setPath] = useState([]);
    const [visitNodes, setVisitNodes] = useState([]);
    const [error, setError] = useState("");


    // similar to componentDidMount();
    useEffect(() => {
        setMatrix(createMatrix);
    }, [])


    const addNeighbors = (m) => {
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){
                if (i > 0){
                    m[i][j].neighbors.push(m[i - 1][j]);
                }
                if(i < rows - 1){
                    m[i][j].neighbors.push(m[i + 1][j])
                }
                if(j > 0){
                    m[i][j].neighbors.push(m[i][j - 1]);
                }
                if(j < cols - 1){
                    m[i][j].neighbors.push(m[i][j + 1]);
                }
            }
        }
    };

    const createNode = (row, col) => {
        return {
            row,
            col,
            isStart : row === NODE_START_ROW && col === NODE_START_COL,
            isEnd : row === NODE_END_ROW && col === NODE_END_COL,
            dist : Infinity,
            isVisited : false,
            //TODO user selected walls
            isWall : Math.random(1) < .2 ? true : false,
            weight : 0,
            prevNode: null,
            neighbors: [],
            f : 0,
            g : 0,
            h : 0,
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
        addNeighbors(matrix);
        const startNode = matrix[NODE_START_ROW][NODE_START_COL];
        const endNode = matrix[NODE_END_ROW][NODE_END_COL];

        //TODO set up way for multiple algs. all need a path and visitedNodes

        startNode.isWall = false;
        endNode.isWall = false;
        // matrix[1][0].isWall = true;
        // matrix[0][1].isWall = true;
        let p = Astar(startNode, endNode);
        setPath(p.path);
        setVisitNodes(p.visitedNodes);
        setError(p.error);
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
    // console.log(path);

    const visualizeShortestPath = (shortestPath) => {
        for(let i = 1; i < shortestPath.length - 1; i++) {
            setTimeout(() =>{    
                const node = shortestPath[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = "node node-path";
            }, 50 * i);
        }
    }
    const visualizePath = () => {
        for(let i = 1; i <= visitNodes.length; i++) {
            if (i === visitNodes.length){
                setTimeout(() =>{    
                    visualizeShortestPath(path);
                }, 20 * i);
            } else {
                setTimeout(() =>{    
                    const node = visitNodes[i];
                    document.getElementById(`node-${node.row}-${node.col}`).className = "node node-visited";
                }, 20 * i);
            }
            
        }
    };

    const resetMatrix = () => {
        for(let i = 0; i < matrix.length; i++){
            for(let j = 0; j < matrix[i].length; j++){
                if(!matrix[i][j].isStart && !matrix[i][j].isEnd && !matrix[i][j].isWall){
                    document.getElementById(`node-${i}-${j}`).className = "node ";
                }
            }
        }
    }
    return (
        <div className="PathFindContainer">
            <h1>Pathfind Component</h1>
            <button onClick={visualizePath}>Search</button>
            <button onClick={resetMatrix}>Clear</button>
            {matrixWithNodes}
        </div>
    );
};

export default PathFind;