namespace('App.controller');
App.controller.GameCtrl = ez.base.BaseController.extend({
	$inject: ['$scope'],
	init: function($scope) {
		var me = this;

		me.cardMap = new CardMap();

		$scope.CARD_WIDTH = 52;
		$scope.cards = [].concat(me.cardMap.data);
		$scope.score = me.cardMap.score;
		$scope.high_score = 0;

		$scope.onSwipe = function(e){
			switch(e.direction){
				case Hammer.DIRECTION_UP:
					me.cardMap.translate('up');
					break;
				case Hammer.DIRECTION_DOWN:
					me.cardMap.translate('down');
					break;
				case Hammer.DIRECTION_LEFT:
					me.cardMap.translate('left');
					break;
				case Hammer.DIRECTION_RIGHT:
					me.cardMap.translate('right');
					break;
			}
			me.cardMap.createNewCards(1);
			me.cardMap.updateElements();
			$scope.score = me.cardMap.score;
		};

		document.addEventListener('keydown', function(e){
			switch(e.keyIdentifier){
				case 'Up':
					me.cardMap.translate('up');
					break;
				case 'Down':
					me.cardMap.translate('down');
					break;
				case 'Left':
					me.cardMap.translate('left');
					break;
				case 'Right':
					me.cardMap.translate('right');
					break;
			}
			me.cardMap.createNewCards(1);
			me.cardMap.updateElements();
			$scope.$apply(function(){
				$scope.score = me.cardMap.score;
			});
		});

		$scope.showCardInfo = function(card){
			console.log(card);
			var className = 'tada';
			var card_id = '#c-' + card.card_id;
			var className = 'shake';
			$(card_id).addClass(className);
			setTimeout(function(){
				$(card_id).removeClass(className);						
			},1000);
		};
	}

});

var CardMap = function(data){
	if(data){
		this.setData(data);
	} else {
		this.__init();
		this.createNewCards(2);
	}
};
CardMap.prototype = {
	ROW_COUNT: 4,
	COL_COUNT: 4,
	CARD_WIDTH: 52,
	data: [],
	posMap: {},
	emptyCards: [],
	col: 0,
	row: 0,
	score: 0,
	size: function(){
		return this.data.length;
	},
	setData: function(data){
		this.data = data;
		this.ROW_COUNT = data.length;
		this.COL_COUNT = data[0].length;
		this.updatePosMap();
	},
	__init: function(){
		var cards = [];
		var data = this.data;
		var emptyCards = this.emptyCards = [];
		for (var y = 0; y < 4; y++) {
			var col = [];
			for (var x = 0; x < 4; x++) {
				var card_id = x+'-'+y;
				var card = {
					card_id: card_id,
					num: '',
					x: x,
					y: y,
					empty: true
				}
				this.posMap[card_id] = [x, y];
				emptyCards.push(card_id);
				col.push(card);
			}
			cards.push(col);
		}
		this.data = cards;
	},
	getN: function(n){
		if(n < 2) return 0;
		var x = 0;
		while(n > 1){
			n = n / 2;
			x++;
		}
		return x;
	},
	updatePosMap: function(){
		var data = this.data;
		var emptyCards = this.emptyCards = [];
		for (var y = 0; y < this.ROW_COUNT; y++) {
			for (var x = 0; x < this.COL_COUNT; x++) {
				var card = data[y][x];
				card.x = x;
				card.y = y;
				this.updatePos(card);
			};
		};
	},
	updatePos: function(card){
		var emptyCards = this.emptyCards = [];
		this.posMap[card.card_id] = [card.x, card.y];
		if(card.empty){
			emptyCards.push(card.card_id);
		}
	},
	updateElements: function(){
		var data = this.data;
		for (var y = 0; y < this.ROW_COUNT; y++) {
			for (var x = 0; x < this.COL_COUNT; x++) {
				var card = data[y][x];
				this.updateElement(card, x, y);
			}
		}
	},
	updateElement: function(card, x, y){
		var element = $('#c-'+card.card_id);
		var background_color;
		if(card.empty){
			background_color = 'rgb(218,206,197)';
		} else {
			background_color = 'rgb(240,240,'+ (255-this.getN(card.num)*20)+')';
		}
		element.css({
			'left': x*this.CARD_WIDTH+'px',
			'top': y*this.CARD_WIDTH+'px',
			'background-color': background_color,
		});
		element.text(card.num);
	},
	transition: function(card, x, y, duration){
		var element = $('#c-'+card.card_id);
		element.css({
			'left': x*this.CARD_WIDTH+'px',
			'top': y*this.CARD_WIDTH+'px',
			'transition': 'left '+duration+'s, top '+duration+'s',
		});
	},
	animate: function(selector, animation, duration){
		var element = $(selector);
		if(!element) return;
		duration = duration || 1;
		element.css('animation-duration', duration+'s');
		element.addClass(animation);
		setTimeout(function(){
			element.removeClass(animation);						
		}, duration * 1000);
	},
	createNewCards: function(count){
		var cards = this.data, emptyArr = this.emptyCards;

		if(emptyArr.length < count){
			return false;
		}

		var newCount = 0;
		while(newCount < count){
			var random = Math.floor(Math.random() * emptyArr.length);
			var theOne = emptyArr.splice(random, 1)[0];
			var r = theOne.substr(0,1), c = theOne.substr(2,1);
			var card_pos = this.posMap[r+'-'+c];
			var card = cards[card_pos[1]][card_pos[0]];
			card.num = '2';
			card.empty = false;
			this.updateElement(card, r, c);

			newCount++;
		}
		return true;
	},
	translate: function(direction, data){
		data = data || this.data;
		this.output(data);
		if(direction === 'up'){
			this.translateUp(data);
		}else if(direction === 'down'){
			this.translateDown(data);
		}else if(direction === 'left'){
			this.translateLeft(data);
		}else if(direction === 'right'){
			this.translateRight(data);
		}
		this.output();
		return this.updatePosMap();
	},
	translateUp: function(data){
		var newArr = [];
		for (var col = 0; col < data.length; col++) {
			var array = [];
			for (var i = 0; i< data.length; i++) {
				array.push(data[i][col]);
			};
			var translated = this.translateArrLeft(array);
			newArr.push(translated);
		};
		var tmpArr = [];
		for (var col = 0; col < newArr.length; col++) {
			var array = [];
			for (var i = 0; i< newArr.length; i++) {
				array.push(newArr[i][col]);
			};
			tmpArr.push(array);
		};
		this.data = tmpArr;
	},
	translateDown: function(data){
		var newArr = [];
		for (var col = 0; col < data.length; col++) {
			var array = [];
			for (var i = 0; i< data.length; i++) {
				array.push(data[i][col]);
			};
			var translated = this.translateArrRight(array);
			newArr.push(translated);
		};
		var tmpArr = [];
		for (var col = 0; col < newArr.length; col++) {
			var array = [];
			for (var i = 0; i< newArr.length; i++) {
				array.push(newArr[i][col]);
			};
			tmpArr.push(array);
		};
		this.data = tmpArr;
	},
	translateLeft: function(data){
		for (var col = 0; col < data.length; col++) {
			var array = data[col];
			data[col] = this.translateArrLeft(array);
		};
	},
	translateRight: function(data){
		for (var col = 0; col < data.length; col++) {
			var array = data[col];
			data[col] = this.translateArrRight(array);
		};
	},

	translateArrLeft: function(originArr){
		var me = this;
		var arr = [].concat(originArr);
		// 合并
		for (var i = 0; i < arr.length -1; i++) {
			var item = arr[i];
			if(item.empty) continue;

			for (var j = i+1; j < arr.length; j++) {
				var nextItem = arr[j];
				if(!nextItem.empty){
					if(item.num === nextItem.num){
						var duration = Math.max(Math.abs(item.x-nextItem.x), Math.abs(item.y-nextItem.y))/2;
						me.transition(nextItem, item.x, item.y, duration);
						setTimeout(function(){
							nextItem.num = '';
							nextItem.empty = true;
							me.updateElement(nextItem, nextItem.x, nextItem.y);

							item.num = ''+ item.num * 2;
							me.animate('#c-'+item.card_id, 'pulse', 0.5);
							me.updateElement(item, item.x, item.y);

							me.score += item.num * 1;
						}, duration*1000);

						i = j;
					}
					break;
				}
			}
		}
		//　移位
		var times = 0, i = 0;
		while(times < arr.length-1){
			var item = arr[i];
			if(item.empty){
				arr.splice(i, 1);
				arr.push(item);
			} else {
				i++;
			}
			times++;
		}
		return arr;
	},

	translateArrRight: function(originArr){
		var me = this;
		var arr = [].concat(originArr);
		// 合并
		for (var i = arr.length - 1; i > 0; i--) {
			var item = arr[i];
			if(item.empty) continue;

			for (var j = i-1; j >= 0; j--) {
				var nextItem = arr[j];
				if(!nextItem.empty){
					if(item.num === nextItem.num){
						var duration = Math.max(Math.abs(item.x-nextItem.x), Math.abs(item.y-nextItem.y))/2;
						me.transition(nextItem, item.x, item.y, duration);
						setTimeout(function(){
							nextItem.num = '';
							nextItem.empty = true;
							me.updateElement(nextItem, nextItem.x, nextItem.y);

							item.num = ''+ item.num * 2;
							me.animate('#c-'+item.card_id, 'pulse', 0.5);
							me.updateElement(item, item.x, item.y);

							me.score += item.num * 1;
						}, duration*1000);
						// item.num = ''+ item.num * 2;
						// this.score += item.num * 1;
						// this.animate('#c-'+item.card_id, 'pulse', 0.5);

						// nextItem.num = '';
						// nextItem.empty = true;
						i = j;
					}
					break;
				}			
			}
		}
		//　移位
		var times = 0, i = arr.length-1;
		while(times < arr.length-1){
			var item = arr[i];
			if(item.empty){
				arr.splice(i, 1);
				arr.unshift(item);
			}else {
				i--;
			}
			times++;
		}
		return arr;
	},

	output: function(data){
		console.debug('=================');
		data = data || this.data;
		for (var y = 0; y < 4; y++) {
			var line = '';
			for (var x = 0; x < 4; x++) {
				var card = data[y][x];
				if(card.empty){
					line += ' ' + card.card_id;	
				}else{
					line += ' ' + card.card_id.replace('-', '+');	
				}
			};
			console.debug(line);
		};
		console.debug('-----------------');
	}

};