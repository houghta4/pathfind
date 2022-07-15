function Astar(startNode, endNode){
    let openSet = [],
        closedSet = [],
        path = [],
        visitedNodes = [];

    openSet.push(startNode);

    while(openSet.length > 0) {
        let leastIndex = 0;
        for(let i = 0; i < openSet.length; i++){
            if(openSet[i].f < openSet[leastIndex].f) {
                leastIndex = i;
            }
        }

        let cur = openSet[leastIndex];
        if (cur === endNode){
            let temp = cur;
            path.push(temp);
            while(temp.prevNode !== null) {
                path.push(temp.prevNode);
                temp = temp.prevNode;
            }
            return {path, visitedNodes};
        }
        visitedNodes.push(cur);

        openSet = openSet.filter(n => n !== cur);
        closedSet.push(cur);

        let neighbors = cur.neighbors;
        for (let i = 0; i < neighbors.length; i++){
            let n = neighbors[i];
            if(!closedSet.includes(n) && !n.isWall){
                let tempG = cur.g + 1;
                let newPath = false;
                if(!openSet.includes(n)){
                    newPath = true;
                    n.h =heruistic(n, endNode); 
                    openSet.push(n);
                } else if (tempG < n.g) {
                    newPath = true;
                }
                if (newPath) {
                    n.g = tempG;
                    n.f = n.h + n.g;
                    n.prevNode = cur;
                }
            }
        }
    }
    return {path, visitedNodes, error: "No Path Found!"};
}

const heruistic = (a, b) => Math.abs(a.row - a.col) + Math.abs(b.row - b.col);

export default Astar;