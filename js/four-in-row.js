(function($){
	$.fn.extend({
		fourInRow: function(options) {
			this.defaultOptions = {
				columns : 7,
				rows : 5,
				size : 60

			};

			var settings = $.extend({}, this.defaultOptions, options);
	
			return this.each(function() {
				new $.FIRGame(this, settings);
			});
		},
	});

	$.FIRGame = function(el, opt) {
		
		var $el = $(el),
			row = fillZero(opt.columns),
			board = fillZero(opt.columns * opt.rows),
			players = $('.player'),
			redplayer = $('.red'),
			yellowplayer = $('.yellow'),
			turn = 1, //first player = 1, second player = -1;
			dprimary = [],
			dsecondary = [];

			
		for (i=0;i<=opt.columns-4;i++){
			dprimary[dprimary.length] = i;
		}
		for (i=1;i<=opt.rows-4;i++){
			dprimary[dprimary.length] = i*opt.columns;
		}

		for (i=opt.columns-4;i<opt.columns;i++){
			dsecondary[dsecondary.length] = i;
		}
	
		for (i=1;i<=opt.rows-4;i++){
			dsecondary[dsecondary.length] = (i+1)*opt.columns - 1;	
		}
		

/*		console.log(dprimary);
		console.log(dsecondary);

		console.log(board);
*/		
		init();

		function fillZero(count) {
			var a = [];
			for(var i=0;i<count;i++){
				a[a.length] = 0;
			}
			return a;
		}

		function init(){		
			$el.css({
					width: (opt.columns * opt.size + opt.columns * 2),
					height: opt.rows * opt.size + opt.rows * 2 + 30
			}).html( '' );
			
			$.each(row,function(i) {
				$('<div>', {class: 'drop', text: 'press'}).data('x', i).appendTo($el);
			});

			$.each(board,function(i) {
				$('<div>', {class: 'block', text: i, id: 'cell' + i}).appendTo($el);
				
			});
			redplayer.addClass('active');		
		}
		
		$el.on('click', '.drop', function () {
			console.info('===============turn==================');
			
			var x = $(this).data('x'),
				coin = (turn > 0) ? 'coin1' : 'coin2';

			var pos, id = -1;
			for(var i=(opt.columns-1);i >= 0 ;i--) {
				pos = i*opt.columns + x;
				if (board[pos] == 0) {
					id = pos;
					break;
				}
			}

			if (id >= 0) {
				board[id] = turn;
				$('div#cell' + id).html('<span class="' + coin + '"></span>');
				turn = turn * (-1);
				var win = isCompleted(board);
				
				if (win == 0) {
					players.toggleClass('active');
				} else {
					var winner = (win > 0) ? redplayer : yellowplayer;
					winner.addClass('winner');
				}
			} else {
				console.log('imposible');
			}
			console.log(board);
			
		});

		function isCompleted(moves){
			var i,j,line,check,draw;
			//check –			
			// console.info('----------check----------');
			for (i = 0;i<opt.columns-1;i++) {
				line = moves.slice(i*opt.columns, i*opt.columns + opt.columns);
				if ( (check = checkLine(line)) != 0 )
					return check;				
			}
			
			//check |
			console.info('|||||||||||check|||||||||||');
			for (i = 0;i<(opt.columns -1);i++) {
				line = [];
				for (j = 0;j<opt.rows;j++) {
					line[line.length] = moves[i + j*opt.columns];
				}
			
				if ( (check = checkLine(line)) != 0 )
					return check;
				
			}


			//check \
			// console.info('\\\\\\\\\\\check\\\\\\\\\\\\\\');
			for (i=0;i<=dprimary.length-1;i++){
				var indx=dprimary[i];
				line = [];
				while(typeof(moves[indx]) !== 'undefined'){
					//console.log(indx);					
					line[line.length] = moves[indx];
					indx += opt.columns + 1;
					
				}
				if ( (check = checkLine(line)) != 0 )
					return check;

			}

			//check /
			// console.info('/////////////check/////////////');
			for (i=0;i<=dsecondary.length-1;i++){
				var indx = dsecondary[i];
				line = [];
				while(typeof(moves[indx]) !== 'undefined'){
					line[line.length] = moves[indx];
					if (indx%opt.columns == 0){break;}
					indx += opt.columns - 1;
				}								
				if ( (check = checkLine(line)) != 0 )
					return check;

			}


			draw = true;
			for (i=0;i<opt.columns-1;i++){
				if (moves[i] == 0) {
					draw = false;
					break;
				}
			}
			if (draw){ drawGame(); }
	
			return 0;
		}

		function checkLine(line){
			console.warn(line);
			var counter = 0;
			for (var i=0; i<line.length-1;i++){
				if (line[i]!=0 && line[i] == line[i+1]) {
					counter++;
				} else {
					counter = 0;
				}
				// console.info(counter);
				if (counter == 3) return line[i];
			}
			return 0;
		}	

		function drawGame(){
			console.log('draw');
			
		}

	};


})(jQuery);

