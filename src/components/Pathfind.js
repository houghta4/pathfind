import React, {useState, useEffect} from "react";
import Node from "./Node";
import ButtonAlg from "./ButtonAlg";
import Astar from "../algs/astar";
import Dfs from "../algs/dfs";
import "../css/Pathfind.css";

const ALGS = {
    Astar: 0,
    Dfs: 1,
    Dijkstra: 2,
    bfs: 3,
};

//TODO reset matrix on buttonclick to account for user selected walls?

// TODO user selected size
const rows = 10;
const cols = 25;


// TODO user selected start and end
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


    // similar to componentDidMount();
    useEffect(() => {
        setIsBusy(true);
        setMatrix(createMatrix);
        setIsBusy(false);
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
        // matrix[0][1].isWall = true;
        // matrix[1][0].isWall = true;
        // default to Astar
        // const startNode = matrix[NODE_START_ROW][NODE_START_COL];
        // const endNode = matrix[NODE_END_ROW][NODE_END_COL];
        // startNode.isWall = false;
        // endNode.isWall = false;
        // let p = Astar(startNode, endNode);
        // setPath(p.path);
        // setVisitNodes(p.visitedNodes);
        
        return matrix;
    };

    //only refreshing the dom if return a new object?
    const updateMatrix = (row, col) => {
        matrix[row][col].isWall = !matrix[row][col].isWall;
        setMatrix(matrix.slice());
    };

    //what component do i give this to: eventual grid component
    // const mouseLeaveHandler = () => {
    //     setMouseClicked(false);
    // };

    const mouseEnterHandler = (row, col) => {
        if (!mouseClicked)
            return;
        // console.log("entering");
        updateMatrix(row, col);
    };

    const mouseDownHandler = (row, col) => {
        // console.log("down");
        setMouseClicked(true);
        updateMatrix(row, col);
    };

    const mouseUpHandler = () => {
        // console.log("up");
        setMouseClicked(false);
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
                                    onMouseEnter={(r, c) => mouseEnterHandler(r, c)}
                                    onMouseDown={(r, c) => mouseDownHandler(r, c)}
                                    onMouseUp={mouseUpHandler}
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

    const runAstar = () => {
        const startNode = matrix[NODE_START_ROW][NODE_START_COL];
        const endNode = matrix[NODE_END_ROW][NODE_END_COL];
        startNode.isWall = false;
        endNode.isWall = false;
        let p = Astar(startNode, endNode);
        setError(p.error);
        visualizePath(p.path, p.visitedNodes);
    };

    const runDfs = () => {
        const startNode = matrix[NODE_START_ROW][NODE_START_COL];
        const endNode = matrix[NODE_END_ROW][NODE_END_COL];
        startNode.isWall = false;
        endNode.isWall = false;
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
                }} />
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
                }} />
            {/* <button value={ALGS.Astar} onClick={n => searchMatrix(n.target.value)} autoFocus>A*</button>
            <button value={ALGS.Dfs} onClick={n => searchMatrix(n.target.value)}>Dfs</button> */}
            <br/>
            {/* <button onClick={visualizePath}>Search</button> */}
            <button onClick={resetMatrix}>Clear</button>
            {error && <div className="error">{error}</div>}
            {matrixWithNodes}
        </div>
    );
};

export default PathFind;