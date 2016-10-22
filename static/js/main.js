$(document).ready(function(){

    // Dictionary to map colors to tile values
    var COLORS = {
        2: "#5A6351",
        4: "#636F57",
        8: "#8BA870",
        16: "#608341",
        32: "#659D32",
        64: "#629632",
        128: "#488214",
        256: "#397D02",
        512: "#308014",
        1024: "#49E20E",
        2048: "#32CD32",
        4096: "#00FF33",
        8192: "#54FF9F"
    };

    // A grid to keep track of occuppied positions.
    var GRID = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    // Only ever going to need 16 tiles.
    var TILES = [];
    for(i = 0; i < 16; i++){
        TILES[i] = {
            position: [-1, -1],
            value: 0,
            color: '#ffffff',
            free: true,
            coordinates: [],
            html: "<div class='tile' id='tile-"+ i +"'></div>",
            id: "#tile-" + i
        };
    }

    // Place the grid container
    var middle = $(window).width()/2;
    var push = middle - $('#main-container').width()/2;
    $('#main-container').css('margin-left', push + 'px');
    $('#tile-container').css('margin-left', push + 'px');

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

    // merge tile1 into tile2.
    // combines their values.
    // tile1 becomes free and is
    // removed from the grid.
    function merge(tile1, tile2){

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
            // Grab a tile
            var tile = grabATile();
            // Generate a position for the tile
            var position = findPositionForTile();

            // Set the position, and mark the grid
            TILES[tile].position = position;
            GRID[position[0]][position[1]] = TILES[tile];

            var value = Math.pow(2, Math.floor(Math.random() * 2 + 1));
            TILES[tile].value = value;
            TILES[tile].color = setColor(value);
            TILES[tile].free = false;

            $("#tile-container").append(TILES[tile].html);
            $(TILES[tile].id).css('background-color', TILES[tile].color);
            var coordinates = getCoordinates(TILES[tile].position);
            TILES[tile].coordinates = coordinates;
            $(TILES[tile].id).css({
                'margin-left': coordinates[0] + 4 + "px",
                'margin-top': coordinates[1] + 4 + "px",
                'width': tile_size,
                'height': tile_size
            });
            $(TILES[tile].id).css({
                'padding-left': tile_size/2 - 12 + "px",
                'padding-top': tile_size/2 - 32 + "px"
            });
            $(TILES[tile].id).text(TILES[tile].value);
        }
    }

    // Get tile coordinates from position
    function getCoordinates(position){
        var pushX = position[0] * tile_size;
        var pushY = position[1] * tile_size;
        return [pushX, pushY];
    }

    // Set a tiles color
    function setColor(value){
        return COLORS[value];
    }

    // Grabs a free tile
    function grabATile(){
        var tile = 0;
        while(!TILES[tile].free){
            tile++;
        }
        return tile;
    }


    // Returns a free position for the tile
    function findPositionForTile(){
        var position = randomPosition();
        while(!isEmpty(position)){
            position = randomPosition();
        }
        return position;
    }

    // Returns a random grid position
    // where a tile may be placed.
    function randomPosition(){
        var x = Math.floor(Math.random() * 4);
        var y = Math.floor(Math.random() * 4);
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
                if(isEmpty([i, j])){
                    return false;
                }
            }
        }
        return true;
    }

    $(document).keydown(function(e){
        var key = e.which;

        var keyname = "";
        if(key == 37 || key == 65){
            // left
            keyname = "left";
        } else if(key == 38 || key == 87){
            // up
            keyname = "up";
        } else if(key == 39 || key == 68){
            // right
            keyname = "right";
        } else if(key == 40 || key == 83){
            // down
            keyname = "down";
        }
        console.log(keyname);
    });


    // Start the game
    addTile();
    addTile();
});
