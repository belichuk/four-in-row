function arrayPad(start, end, value) {
    arr = [];
    while (start++ < end) {
        arr.push(value);
    }
    return arr;
}

function chunk(array, size) {
    return [].concat.apply([],
    array.map(function (elem, i) {
        return i % size ? [] : [array.slice(i, i + size)];
    }));
}


var columns = 7, //7
    rows = 6, //6
    scale = 60;

var empty = arrayPad(0, columns * rows, 0);
var start = chunk(empty, rows);


// console.log(start);

$(document).ready(function () {
    $('.new').on('click', function () {
        window.location.reload(true);
    });

    function check_for_win() {
        var i;
        var j;
        var counter;

        // horizontally
        for (i = 0; i < rows; i++) {
            //console.info('i: ========' + i + '========');
            counter = 1;
            for (j = 0; j < columns - 1; j++) {
                //console.log(j + ' ' + i + ' = ' +  start[j][i] + " | check " + j+i + " <> " + (j + 1) + i  );
                if (start[j][i] != 0 && start[j][i] == start[j + 1][i]) {
                    counter++;
                }

                if (counter == 4) return start[j][i];
            }
            //console.warn('counter: ' + counter);	        
        }


        //apeak
        for (i = 0; i < rows; i++) {
            // console.info('i: ========' + i + '========');
            counter = 1;
            for (j = 0; j < (columns - 1); j++) {
                // console.log( i +''+ j + ' = ' +  start[i][j] + " | check " + i+j + " <> " + i + (j+1)  );
                if (start[i][j] != 0 && start[i][j] == start[i][j + 1]) {
                    counter++;
                }

                if (counter == 4) return start[i][j];
            }
            console.warn('counter: ' + counter);
        }
        //diagonal
        for (i = 0; i < rows - 4; i++) {
            counter = 1;
            for (j = 0; j < (columns - 5); j++) {
                console.log(i + '' + j + ' = ' + start[i][j] + " | check " + i + j + " <> " + i + (j + 1));

            }
        }
        var end = is_full();

        if (end == 0) {
            alert("The end");
        }

        return 0;
    }

    function is_full() {

        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < columns; j++)
            if (start[i][j] == '0') return 1;
        }

        return 0;
    }




    var board = $('#gameboard'),
        players = $('.player'),
        redplayer = $('.red'),
        yellowplayer = $('.yellow'),
        turn = 1; //red player = 1, yellow player = -1


    board.css({
        width: (columns * scale + columns * 2),
        height: rows * scale + rows * 2 + 30
    });

    for (var i = 0; i < columns; i++) {
        board.append($(document.createElement('div')).addClass('drop').data('x', i).text('press'));
    }
    for (i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            //.css({ width: scale, height: scale })
            board.append($(document.createElement('div')).addClass('block').attr('ID', 'cell' + j + i)); //.data('x', j).data('y', i) )
        }
    }

    redplayer.toggleClass('active');

    board.on('click', '.drop', function () {
        if ($('.player').hasClass('winner')) {
        	alert('Game over');
            return false;
        }

        var x = $(this).data('x');
        // var y = $(this).data('y');
        var coin = (turn > 0) ? 'redcoin' : 'yellowcoin';

        var y = -1;
        for (var i = 0; i < columns; i++) {
            if (start[x][i] == 0) {
                y = i;
            }
        }

        //console.log('sel row:' + x);
        if (y >= 0) {

            start[x][y] = turn;
            console.log(start);

            $('div#cell' + x + y).html('<span class="' + coin + '"></span>');
            turn = turn * (-1);
            var win = check_for_win();

            if (win == 0) {
                players.toggleClass('active');
            } else {
                var winner = (win > 0) ? redplayer : yellowplayer;
                winner.addClass('winner');
            }
        } else {
            console.log('imposible');

        }




        /*		start[y][x] = turn;
		console.log(x + ' ' + y);
		console.log(start);
		
		$(this).addClass('used').html('<span class="' + coin + '"></span>');
		turn = turn * (-1);
		players.toggleClass('active');*/
        // console.log(turn);


    });

});