$(document).ready(function(){

    // Place the grid container
    var middle = $(window).width()/2;
    var push = middle - $('#main-container').width()/2;
    $('#main-container').css('margin-left', push + 'px');

    // Make the grid
    var tile_size = $('#main-container').width()/4;
    for(i = 0; i < 4; i++){
        $('#main-container').append('<tr id="row-' + i + '"></tr>');
        for(j = 0; j < 4; j++){
            var tile = "<td class='tile' id='tile-"+ i + "-" + j +"'></td>";
            var row = "#row-" + i;
            $(row).append(tile);
            $('.tile').css({'width': tile_size, 'height': tile_size});
        }
    }

    // Attempt to add a tile.
    // Return true on success
    // Return false on failure.
    function addTile(){

    }

    // Returns a random grid position
    // where a tile may be placed.
    function randomPosition(){

    }

    // Returns true if a grid space is empty
    function isEmpty(){

    }
});
