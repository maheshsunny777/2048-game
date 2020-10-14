//global variables
var score=0,bestScore=[0,0,0];
var toogleEmoji='number';

//initialize game
function init(grid=0){
    grid=[
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];
    grid=newValue(grid);
    grid=newValue(grid);
    score=updateScore(0);
    bestScore=updateBestScore(bestScore,score);
    return grid;
}

// starts Event listener
function play(grid){
    document.addEventListener('keydown', function(e) {
        //update the board with respect to keydown and game status.
        let gameStatus=(isGameWon(grid))?"YOU!WIN!":((isGameOver(grid))?"GAMEOVER":"Still Playing!");
        if(gameStatus!=='Still Playing!'){
            if(gameStatus==='GAMEOVER')
                $('.gameovertext').text('Game Over!');
            else
                $('.gameovertext').text('Mission Passed!');
                $('.gameover').animate({top:'0px'},'slow','swing');
                bestScore=updateBestScore(bestScore,score);
                this.removeEventListener('keydown',arguments.callee,false);
        }else{
            grid=update(grid,e.code);
        }
    });
}

//toogle button event listener
$('.toogleEmoji').click(()=>{
    toogleEmoji=(toogleEmoji=='emoji')?'number':'emoji';
    console.log(toogleEmoji);
    let valueToEmoji={
        " ":" ",
        2:"😶",
        4:"😐",
        8:"😀",
        16:"😁",
        32:"😜",
        64:"🤪",
        128:"😆",
        256:"😂",
        512:"🤣",
        1024:"😵",
        2048:"🤯",
    }
    $('.grid-4X4container').animate({left:'30px'},50,'linear',()=>{
        $('.grid-4X4container').animate({left:'-30px'},50,'linear',()=>{
            $('.grid-4X4container').css({left:'0px'})
        })
    })
    $('.tile').each(function(i){
        if(toogleEmoji=='emoji'){
            $(this).text(valueToEmoji[$(this).text()])
        }else{
            $(this).text(Object.keys(valueToEmoji)[Object.values(valueToEmoji).indexOf($(this).text())]);
        }
    });
})

//renders the grid to html
function render(grid){
    $('.tile').each(function(i){
        let numToIndex={
            0:[0,0] ,1:[0,1] ,2:[0,2], 3:[0,3],
            4:[1,0] ,5:[1,1] ,6:[1,2], 7:[1,3],
            8:[2,0] ,9:[2,1] ,10:[2,2],11:[2,3],
            12:[3,0],13:[3,1],14:[3,2],15:[3,3]
        }
        let numToColor={
            " ":"grey",
            2:"#e9e1cf",
            4:"#eedbba",
            8:"#faaa63",
            16:"#fc8e4f",
            32:"#fc7252",
            64:"#fc7252",
            128:"#fc8e4f",
            256:"#fc7252",
            512:"#fc7252",
            1024:"#fc7252",
            2048:"#e7ac27",
        }
        let valueToEmoji={
            " ":" ",
            2:"😶",
            4:"😐",
            8:"😀",
            16:"😁",
            32:"😜",
            64:"🤪",
            128:"😆",
            256:"😂",
            512:"🤣",
            1024:"😵",
            2048:"🤯",
        }
        let value=(grid[numToIndex[i][0]][numToIndex[i][1]]==0)?" ":grid[numToIndex[i][0]][numToIndex[i][1]];
        if(toogleEmoji=='emoji')
            $(this).text(valueToEmoji[value]);
        else
            $(this).text(value);
        $(this).css('background-color',`${numToColor[value]}`)
    });
}

//This checks that "n" is in given array or not
var inArray = (arr,n)=>{
    for(let i=0;i<arr.length;i++){
        if(n==arr[i]){
            return true;
        }
    }
    return false;
}

//This function generates an array of non-repetive random numbers from 0 to n-1
function randomArray(n){
    let arr=[]
    let rand=parseInt((Math.random()*(n)));
    while(arr.length<n){
        if(!inArray(arr,rand)){
            arr.push(rand);
        }
        rand=parseInt((Math.random()*(n)));
    }
    return arr;
}

//updates score
function updateScore(score,bestScore){
    if(score!==0)
        $('.Score').text(score);
    else
        $('.Score').text('');
    return score;
}

//best score leader board
function updateBestScore(bestScore,score){
    if(typeof Storage){
        for(i=0;i<bestScore.length;i++){
            bestScore[i]=(localStorage.getItem(localStorage.key(i)))
            if(bestScore[i]===null) bestScore[i]=0;
        }
    }
    bestScore.sort();
    bestScore=bestScore.map(n=>parseInt(n));
    for(i=0;i<bestScore.length;i++){
        if(score>bestScore[i]){
            bestScore[i]=parseInt(score);
            break;
        }
    }
    if(typeof Storage){
        for(i=0;i<bestScore.length;i++){
            localStorage.setItem(i,parseInt(bestScore[i]));
        }
    }
    bestScore.sort(function(a, b){return b - a});
    $('.leaderboard').each(function(i){
        $(this).text(bestScore[i]);
    });
    $('.bestScore').text(bestScore[0])
    return bestScore;
}

//start game again
function startAgain(grid=0){
    grid=init(grid);
    $('.gameover').animate({top:'-350px'},'slow','swing');
    play(grid);
}