//gets a random value of 2 or 4 at a random position in grid
function newValue(grid){
    rand_row=randomArray(grid.length)
    rand_col=randomArray(grid.length)
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid.length;j++){
            if(grid[rand_row[i]][rand_col[j]]==0){
                grid[rand_row[i]][rand_col[j]] = Math.random() > 0.2 ? 2 : 4;
                render(grid);
                return grid
            }
        }
    } 
    return grid;
}

//right or left action
function moveRightOrLeft(grid,dir){
    for(let i=0;i<grid.length;i++){
        grid[i]=grid[i].filter(function(e){return e;})
        if(grid[i].length>1){
            grid[i]=combineAdjecent(grid[i],dir);
        }
        if(dir===1){
            while(grid[i].length<4){
                grid[i].unshift(0);
            }
        }else{
            while(grid[i].length<4){
                grid[i].push(0);
            }
        }
    }
    return grid;
}
//up or down action
function moveUpOrDown(grid,dir){
    grid=rotate(grid);
    grid=moveRightOrLeft(grid,dir);
    grid=rotate(grid);
    grid=rotate(grid);
    grid=rotate(grid);
    return grid;
}

//combines adjecent elements if they are equal
function combineAdjecent(row,dir){
    let combined_row=[];
    if(dir===1){
        for(let i=row.length-1;i>=0;i--){
            if(i!=0){
                if(row[i]===row[i-1]){
                    combined_row.unshift(row[i]+row[i-1]);
                    score+=row[i]+row[i-1]
                    score=updateScore(score,bestScore);
                    i-=1;
                }else{
                    combined_row.unshift(row[i]);
                }
            }else{
                combined_row.unshift(row[i]);
            }
        }
    }else{
        for(let i=0;i<row.length;i++){
            if(i!=row.length-1){
                if(row[i]===row[i+1]){
                    combined_row.push(row[i]+row[i+1]);
                    score+=row[i]+row[i+1]
                    score=updateScore(score);
                    i+=1;
                }else{
                    combined_row.push(row[i]);
                }
            }else{
                combined_row.push(row[i]);
            }
        }
    }
    return combined_row;
}

//rotates grid
function rotate(grid){
    let rotated_grid=[];
    for(let i=grid.length-1;i>=0;i--){
        let row = [];
        for(let j=0;j<grid.length;j++){
            row.push(grid[j][i]);
        }
        rotated_grid.push(row);
    }
    return rotated_grid;
}

//compares new updates with previous grid
function isUpdated(old_grid,new_grid){
    for(let i=0;i<old_grid.length;i++){
        for(let j=0;j<old_grid.length;j++){
            if(old_grid[i][j]!=new_grid[i][j]){
                return true;
            }
        }
    }
    return false;
}

//updates the grid as per users actions
function update(grid,keycode){
    let old_grid=Object.assign([],grid);
    switch(keycode){
        case 'ArrowRight':
            updated_grid=moveRightOrLeft(grid,1);
            if(isUpdated(old_grid,updated_grid)){
                grid=updated_grid;
                grid=newValue(grid);
            }
            render(grid);
            break;
        case 'ArrowLeft':
            updated_grid=moveRightOrLeft(grid,-1);
            if(isUpdated(old_grid,updated_grid)){
                grid=updated_grid;
                grid=newValue(grid);
            }
            render(grid);
            break;
        case 'ArrowUp':
            updated_grid=moveUpOrDown(grid,-1);
            if(isUpdated(old_grid,updated_grid)){
                grid=updated_grid;
                grid=newValue(grid);
            }
            render(grid);
            break;
        case 'ArrowDown':
            updated_grid=moveUpOrDown(grid,1);
            if(isUpdated(old_grid,updated_grid)){
                grid=updated_grid;
                grid=newValue(grid);
            }
            render(grid);
            break;
        default:
            break;
    }
    return grid;
}
//checks for game is won or not
function isGameWon(grid){
    for(let i=0;i<grid.length;i++){
       for(let j=0;j<grid.length;j++){
           if(grid[i][j]===2048){
               return true;
           }
       }  
    }
    return false;
}
//checks for if game is over or not
function isGameOver(grid){
   for(let i=0;i<grid.length;i++){
       for(let j=0;j<grid.length;j++){
           if(grid[i][j]===0){
               return false;
          }
       }  
    }
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid.length-1;j++){
            if(grid[i][j]===grid[i][j+1]){
                return false;
            }
            if(grid[j][i]===grid[j+1][i]){
                return false;
            }
        }
    }
    return true;
}