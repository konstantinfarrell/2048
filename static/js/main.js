$(document).ready(function(){

    // A grid to keep track of occuppied positions.
    var GRID = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    // Place the grid container
    var middle = $(window).width()/2;
    var push = middle - $('#main-container').width()/2;
    $('#main-container').css('margin-left', push + 'px');

    // Make the grid
    var tile_size = $('#main-container').width()/4;
    for(i = 0; i < 4; i++){
        $('#main-container').append('<tr id="row-' + i + '"></tr>');
        for(j = 0; j < 4; j++){
            var grid = "<td class='grid' id='grid-"+ i + "-" + j +"'></td>";
            var row = "#row-" + i;
            $(row).append(grid);
            $('.grid').css({'width': tile_size, 'height': tile_size});
        }
    }

    // Gets a tile object based on the given
    // position.
    // returns false if no tile is available.
    function getTileFromPosition(position){

    }

    // Moves all tiles in a specified direction
    // returns false if all tiles are unable to move
    // in the specified direction.
    function move(direction){

    }

    // Moves the tile at the given position
    // one space in the given direction.
    // returns false if unable to move.
    function moveTile(position, direction){

    }

    // Attempt to add a tile.
    // Return true on success
    // Return false on failure.
    function addTile(){
        if(!gameOver()){
            // Generate a position
            var position = randomPosition();
            while(!isEmpty(position)){
                position = randomPosition();
            }

            // Grab a free tile and place it

        }
    }

    // Returns a random grid position
    // where a tile may be placed.
    function randomPosition(){
        var x = Math.random() * 3;
        var y = Math.random() * 3;
        return [x, y];
    }

    // Returns true if a grid space is empty
    function isEmpty(coords){
        var row = coords[0];
        var col = coords[1];
        if(GRID[row][col] == 0){
            return true;
        } else {
            return false;
        }
    }

    // Returns true if all tiles are occuppied
    function gameOver(){
        for(i = 0; i < 4; i++){
            for(j = 0; j < 4; j++){
                if(GRID[i][j] == 0){
                    return false;
                }
            }
        }
        return true;
    }
});
