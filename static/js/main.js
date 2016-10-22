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

    var moving = false;

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
        tile2.value += tile1.value;
        tile1.free = true;
        tile1.position = [-1,-1];
        $(tile1.id).fadeOut(10);
        $(tile2.id).css('background-color', setColor(tile2.value));
        $(tile2.id).text(tile2.value);
    }

    // Gets a tile object based on the given
    // position.
    // returns false if no tile is available.
    function getTileFromPosition(position){
        for(i = 0; i < 16; i++){
            if(TILES[i].position == position){
                return TILES[i];
            }
        }
        return false;
    }

    // Moves all tiles in a specified direction
    // returns false if all tiles are unable to move
    // in the specified direction.
    var move = function(direction){
        moving = true;
        var can_move = 16;
        while(can_move){
            can_move = 16;
            for(i = 0; i < 16; i++){
                if(!moveTile(i, TILES[i].position, direction)){
                    can_move--;
                }
            }
        }
        moving = false;
        if(!can_move){
            return true;
        }
    };

    // Moves the tile at the given position
    // one space in the given direction.
    // returns false if unable to move.
    function moveTile(tile, position, direction){
        var new_position = [position[0] + direction[0], position[1] + direction[1]];
        var new_coordinates = getCoordinates(new_position);
        if(isEmpty(new_position)){
            // Just shift the tile
            GRID[TILES[tile].position[0]][TILES[tile].position[1]] = 0;
            TILES[tile].position = new_position;
            TILES[tile].coordinates = new_coordinates;
            GRID[new_position[0]][new_position[1]] = TILES[tile];
        } else {
            try {
                var old_tile = TILES[tile];
                var new_tile = GRID[new_position[0]][new_position[1]];
                if(old_tile.value == new_tile.value){
                    // Merge the tile
                    GRID[TILES[tile].position[0]][TILES[tile].position[1]] = 0;
                    TILES[tile].position = new_position;
                    TILES[tile].coordinates = new_coordinates;
                    GRID[new_position[0]][new_position[1]] = TILES[tile];
                    merge(TILES[tile], GRID[new_position[0]][new_position[1]]);
                } else {
                    return false;
                }
            } catch(TypeError) {
                return false;
            }
        }
        return $(TILES[tile].id).animate({
            'margin-left': new_coordinates[0] + 4 + "px",
            'margin-top': new_coordinates[1] + 4 + "px"
        }, 125).promise().done(function(){
            return true;
        });
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
            $(TILES[tile].id).fadeIn(10);
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
        try {
            if(GRID[row][col] == 0){
                return true;
            } else {
                return false;
            }
        } catch(TypeError){
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

    function addTilesAfterTurn(){
        if(moving == true){
            setTimeout(addTilesAfterTurn(), 250);
        } else {
            addTile();
            addTile();
        }
    }

    $(document).keydown(function(e){
        var key = e.which;

        var keyname = "";
        var direction = [];
        var canAddTiles = false;
        if(key == 37 || key == 65){
            // left
            keyname = "left";
            direction = [-1, 0];
            canAddTiles = true;
        } else if(key == 38 || key == 87){
            // up
            keyname = "up";
            direction = [0, -1];
            canAddTiles = true;
        } else if(key == 39 || key == 68){
            // right
            keyname = "right";
            direction = [1, 0];
            canAddTiles = true;
        } else if(key == 40 || key == 83){
            // down
            keyname = "down";
            direction = [0, 1];
            canAddTiles = true;
        }
        if(move(direction)){
            if(canAddTiles){
                addTilesAfterTurn();
            }
        }
    });


    // Start the game
    addTile();
    addTile();
});
