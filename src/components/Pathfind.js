import React, {useState, useEffect} from "react";
import Node from "./Node";
import ButtonAlg from "./ButtonAlg";
import Astar from "../algs/astar";
import Dfs from "../algs/dfs";
import "../css/Pathfind.css";


// TODO user selected size
const rows = 10;
const cols = 25;

const NODE_START_ROW = 0,
    NODE_START_COL = 0,
    NODE_END_ROW = rows - 1,
    NODE_END_COL = cols - 1;

let chosenAlg = '';

const PathFind = () => {
    const [matrix, setMatrix] = useState([]);
    const [isBusy, setIsBusy] = useState(false);
    // const [path, setPath] = useState([]);
    // const [visitNodes, setVisitNodes] = useState([]);
    const [error, setError] = useState("");
    const [mouseClicked, setMouseClicked] = useState(false);
    const [endMove, setEndMove] = useState(false);
    const [startMove, setStartMove] = useState(false);
    const [startNode, setStartNode] = useState(null);
    const [endNode, setEndNode] = useState(null);

    // similar to componentDidMount();
    useEffect(() => {
        setIsBusy(true);
        setMatrix(createMatrix);
        setIsBusy(false);
    }, [])


    const addNeighbors = (m) => {
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){

                //S
                if(i < rows - 1){
                    m[i][j].neighbors.push(m[i + 1][j])
                }
                //W
                if(j > 0){
                    m[i][j].neighbors.push(m[i][j - 1]);
                }
                //N
                if (i > 0){
                    m[i][j].neighbors.push(m[i - 1][j]);
                }
                //E
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
            isWall : false,
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
        matrix[NODE_START_ROW][NODE_START_COL].isWall = false;
        matrix[NODE_END_ROW][NODE_END_COL].isWall = false;
        setStartNode(matrix[NODE_START_ROW][NODE_START_COL]);
        setEndNode(matrix[NODE_END_ROW][NODE_END_COL]);        
        return matrix;
    };

    //only refreshing the dom if return a new object?
    const updateMatrixWall = (row, col) => {
        console.log("wall");
        matrix[row][col].isWall = !matrix[row][col].isWall;
        setMatrix(matrix.slice());
    };

    //TODO running into issues where if the user clicks before the state is set it will do weird things
    
    const updateMatrixEnd = (row, col) => {
        console.log("end");
        matrix[row][col].isEnd = !matrix[row][col].isEnd;
        setMatrix(matrix.slice());
    };

    const updateMatrixStart = (row, col) => {
        console.log("start");
        matrix[row][col].isStart = !matrix[row][col].isStart;
        setMatrix(matrix.slice());
    };
    //what component do i give this to: eventual grid component
    const mouseLeaveHandler = (row, col) => {
        if (!mouseClicked)
            return;
        if(startMove){
            updateMatrixStart(row, col);
        }else if (endMove){
            updateMatrixEnd(row, col);
        }
    };

    const mouseEnterHandler = (row, col) => {
        if (!mouseClicked)
            return;
        // console.log("entering");
        if(startMove){
            updateMatrixStart(row, col);
        }else if (endMove){
            updateMatrixEnd(row, col);
        }else {
            updateMatrixWall(row, col);
        }
    };

    const mouseDownHandler = (row, col) => {
        if(isBusy){
            setError("Clear board before editing!");
            return; 
        }
        setMouseClicked(true);
        if(matrix[row][col].isStart){
            setStartMove(true);
        }else if (matrix[row][col].isEnd){
            setEndMove(true);
        }else {
            updateMatrixWall(row, col);
        }

       
    };

    const mouseUpHandler = (row, col) => {
        console.log(row, col);
        // console.log("up");
        if(endMove){
            matrix[row][col].isWall = false;
            setMatrix(matrix.slice());
            setEndNode(matrix[row][col]);
            console.log(endNode);
        }
        if(startMove){
            matrix[row][col].isWall = false;
            setMatrix(matrix.slice());
            setStartNode(matrix[row][col]);
            console.log(startNode);
        }
        setMouseClicked(false);
        setEndMove(false);
        setStartMove(false);
    };


    //TODO make this into its own component to separate grid from buttons.
    //Can also use onMouseLeave on it
    const matrixWithNodes = (
        //matrix with nodes
        <div>
            {matrix.map((row, i) => {
                return (
                    <div key={i} className="rowContainer">
                        {row.map((col, j) => {
                            const {isStart, isEnd, isWall} = col;
                            return (
                                <Node 
                                    draggable
                                    key={j}
                                    row={i}
                                    col={j}
                                    isStart={isStart}
                                    isEnd={isEnd}
                                    isWall={isWall}
                                    onMouseLeave={(r, c) => mouseLeaveHandler(r, c)}
                                    onMouseEnter={(r, c) => mouseEnterHandler(r, c)}
                                    onMouseDown={(r, c) => mouseDownHandler(r, c)}
                                    onMouseUp={(r,c) => mouseUpHandler(r, c)}
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
    const visualizePath = (path, visitNodes) => {
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
        setError('');
        chosenAlg = '';
        for(let i = 0; i < matrix.length; i++){
            for(let j = 0; j < matrix[i].length; j++){
                if(!matrix[i][j].isStart && !matrix[i][j].isEnd && !matrix[i][j].isWall){
                    document.getElementById(`node-${i}-${j}`).className = "node ";
                }
            }
        }
        setIsBusy(false);
    };

    const randomWalls = () => {
        if(isBusy){
            setError("Clear board before editing!");
            return; 
        }
        for(let i = 0; i < matrix.length; i++){
            for(let j = 0; j < matrix[i].length; j++){
                if(!matrix[i][j].isStart && !matrix[i][j].isEnd)
                    matrix[i][j].isWall = Math.random(1) < .2 ? true : false
            }
        }
        setMatrix(matrix.slice());
    };

    const runAstar = () => {
        // const startNode = matrix[NODE_START_ROW][NODE_START_COL];
        // const endNode = matrix[NODE_END_ROW][NODE_END_COL];
        // startNode.isWall = false;
        // endNode.isWall = false;
        console.log("startnode" + startNode);
        console.log("endnode" + endNode);
        let p = Astar(startNode, endNode);
        setError(p.error);
        visualizePath(p.path, p.visitedNodes);
    };

    const runDfs = () => {
        // const startNode = matrix[NODE_START_ROW][NODE_START_COL];
        // const endNode = matrix[NODE_END_ROW][NODE_END_COL];
        // startNode.isWall = false;
        // endNode.isWall = false;
        let p = Dfs(startNode, endNode);
        visualizePath(p.path, p.visitedNodes);
    };

    return (
        <div className="PathFindContainer">
            <h1>Pathfinding Algorithm - {chosenAlg}</h1>
            <br />
            <ButtonAlg 
                name="Astar" 
                onClick={n => {
                    if(isBusy){
                        console.log("Can't run astar. busy");
                        if(!error)
                            setError("Wait until current search is finished or Clear");
                        return;
                    }
                    setIsBusy(true);
                    chosenAlg = "Astar"
                    runAstar();
                }} 
            />
            <ButtonAlg name="Dfs" 
                onClick={n => {
                    if(isBusy){
                        console.log("Can't run dfs. busy");
                        setError("Wait until current search is finished or Clear");
                        return;
                    } 
                    setIsBusy(true);
                    chosenAlg = "Dfs";
                    runDfs();
                }} 
            />            
            {/* TODO need good way to block clear during animation. hard to tell when its done because each node has its own */}

            <br />
            <button onClick={resetMatrix}>Clear</button>
            <button onClick={randomWalls}>Random Walls</button>
            {error && <div className="error">{error}</div>}
            {matrixWithNodes}
        </div>
    );
};

export default PathFind;