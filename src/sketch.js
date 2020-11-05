//depth first search
//https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker

var cols, rows;
var spacing = 10;
var grid = [];
var current;

var stack = []; 

function setup() {
    createCanvas(400,400);
    console.log("");
    console.log(width);
    console.log(height);
    console.log("");
    
    cols = floor(width/spacing);
    rows = floor(height/spacing);
    //frameRate(5);
     
    for(var x = 0; x< rows; x++){
        for(var y = 0; y<cols; y++){
            var cell = new Cell(y,x);
            grid.push(cell);
        }
    }
    console.log(grid);
    current = grid[0];
}

function index(i, j) {
    if(i<0 || j<0 || i>cols-1 || j> rows -1) {
        return -1;
    }
    return i + j * cols;
}

function draw() {
    
    background(51);
    
    for(var i = 0; i < grid.length; i++){
        grid[i].show();
    }

    current.visited=true;
    current.highLight();    
    var next = current.checkNeighbors();
    if( next ) {
        next.visited = true;
        stack.push(current);   
        this.removeWalls(current, next);
        current = next;
    } else if(stack.length > 0) {
        current = stack.pop();
    }
    
}

function Cell(i, j){
    this.i = i;
    this.j = j;
    this.topLine = 0;
    this.rightLine = 1;
    this.bottomLine = 2;
    this.leftLine = 3;
    this.walls = [true, true, true,true];
    this.visited = false;

    this.checkNeighbors = function() {
        var neighbors = [];
        var top = grid[ index(i, j-1)];
        var right = grid[ index(i+1, j)];
        var bottom = grid[ index(i, j+1)];
        var left = grid[ index(i-1, j)];

        if(top && !top.visited){
            neighbors.push(top);
        }
        if(right && !right.visited){
            neighbors.push(right);
        }
        if(bottom && !bottom.visited){
            neighbors.push(bottom);
        }
        if(left && !left.visited){
            neighbors.push(left);
        }

        if ( neighbors.length > 0 ) {
            var r = floor(random(0, neighbors.length));
            return neighbors[r];
        } else {
            return undefined;
        }
    }

    this.show = function () {
        var x = this.i * spacing;
        var y = this.j * spacing;
        stroke(255);
        
        if(this.walls[this.topLine]) 
            line(x, y, x+spacing, y);
        if(this.walls[this.rightLine]) 
            line(x+spacing, y, x+spacing, y+spacing);
        if(this.walls[this.bottomLine]) 
            line(x+spacing, y+spacing, x, y+spacing);
        if(this.walls[this.leftLine]) 
            line(x, y+spacing, x, y);
        
        if(this.visited) {
            noStroke();
            fill(255, 0, 255, 100);
            rect(x,y,spacing,spacing);
        }
    }

    this.highLight = function() {
        var x = this.i * spacing;
        var y = this.j * spacing;
        noStroke();
        fill( 0, 0 , 255, 100);
        rect(x, y, spacing, spacing);
    }
}

function removeWalls(current, next) {
    var x = current.i - next.i;
    if ( x === 1 ) {
        current.walls[current.leftLine] = false;
        next.walls[next.rightLine] = false;
    } else if( x === -1 ) {
        current.walls[current.rightLine] = false;
        next.walls[current.leftLine] = false;
    }     

    var y = current.j - next.j;
    if ( y === 1 ) {
        current.walls[current.topLine] = false;
        next.walls[next.bottomLine] = false;
    } else if( y === -1 ) {
        current.walls[current.bottomLine] = false;
        next.walls[next.topLine] = false    ;
    }     
}

 