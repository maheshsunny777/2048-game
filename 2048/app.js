//fires when document is ready

$('document').ready(()=>{
    //inital calls as soon as dom loads
    let grid=[
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];
    //set any 2 random values in grid
    grid=init(grid);
    //render the grid to browser
    render(grid);
    //listen for key events.
    play(grid);
});