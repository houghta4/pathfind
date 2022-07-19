//TODO can be modified to show "a" path, but its not shortest
let visitedNodes = [],
    path = [];

function Dfs(startNode, endNode) {
    dfsUtil(startNode, endNode);
    console.log(visitedNodes);
    return {path, visitedNodes};
}

function dfsUtil(cur, endNode) {

    
    // if(!cur.isEnd){
    //     visitedNodes.push(cur);
    // }
        
    if (cur === endNode){
        return;
    }

    visitedNodes.push(cur);

    for(let i of cur.neighbors){
        if (!visitedNodes.includes(i) && !i.isWall){
            dfsUtil(i, endNode);
        }
    }
}

export default Dfs;