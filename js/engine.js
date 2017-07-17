var Engine = (function (global) {

    //建立canvas对象
    var win = window,
        doc = win.document,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime,
        // 图片地址只是一个匹配符
        rowImage = 'images/bg_tile.png';
    // 定义画布为全局变量，便于其他 JS 文件调用
    global.ctx = ctx;
    // 定义画布大小
    canvas.width = 798;
    canvas.height = 684;
    doc.body.appendChild(canvas);

    //游戏对象属性
    var Game = function () {
        this.pause = false;
        this.now = Date.now();
        this.nextTime = undefined;
        this.rows = 6;
        this.cols = 7;
    }

    //游戏方法
    Game.prototype = {
        main: function () {
            var _this = this;
            this.nextTime = Date.now();
            var dt = (this.nextTime - this.now) / 1000;
            this.now = this.nextTime;
            this.update(dt);
            this.init();
            this.render();
            this.over();
            window.requestAnimationFrame(function(){
                _this.main();
            });
        },
        start: function () {
            this.main();
        },
        init: function () {
            this.drawCanvas();
        },
        update: function (dt) {
            allBarriers.forEach(function(barrier){
                barrier.update();
            });
            allNonBarriers.forEach(function(enemy){
                enemy.update(dt);
            });
            player.update();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        },
        render: function () {
            allBarriers.forEach(function(barrier){
                barrier.render();
            });
            allNonBarriers.forEach(function(enemy){
                enemy.render();
            });
            player.render();
        },
        pause: function () {
            player.update(0);
            allNonBarriers.forEach(function(enemy){
                enemy.update(0);
            });
        },
        over: function () {
            if(player.gameOver === true){
                this.showOver();
            }
        },
        showOver: function () {
            var text;
            if (player.success === false) {
                text = 'GAME OVER';
            }
            else {
                text = 'YOU WIN';
            }
            ctx.font = '23pt Arial';
            ctx.globalAlpha = 0.65;
            ctx.fillStyle = 'black';
            ctx.fillRect(228, 200, 350, 200);
            ctx.globalAlpha = 1;
            ctx.fillStyle = 'yellow';
            // text要居中
            ctx.textAlign = 'center';
            ctx.fillText(text, 400, 285);
            ctx.font = '18pt Arial';
            ctx.fillStyle = 'white';
            ctx.fillText('Press Enter to Play Again', 400, 350);
        },
        reset: function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            player.reset();
            allNonBarriers.forEach(function(enemy){
                enemy.reset();
            });
            // allBarriers.forEach(function(barrier){
            //     barrier.reset();
            // });
        },
        drawCanvas: function () {
            for(var row = 0; row < this.rows; row++){
                for(var col = 0; col < this.cols; col++){
                    ctx.drawImage(Resources.get(rowImage), col * 115, row * 115);
                }
            }
            // 画界面的基础元素
            // 字体
            ctx.font = '20pt Arial';
            // 边框颜色
            ctx.strokeStyle = 'black';
            // 边框粗细
            ctx.lineWidth = 3;
            // 填充色
            ctx.fillStyle = 'yellow';
            // 填充内容
            ctx.textAlign = 'start';
            ctx.strokeText('收集篮球数: ' + player.score + ' / 5', 565, 630);
            ctx.fillText('收集篮球数: ' + player.score + ' / 5', 565, 630);
            ctx.drawImage(Resources.get('images/heart.png'), 20, 636);
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 4;
            ctx.strokeText('x', 58, 658);
            ctx.strokeText(player.lives, 86, 660);
            ctx.fillStyle = 'black';
            ctx.fillText('x', 58, 658);
            ctx.fillText(player.lives, 86, 660);
            ctx.font = '12.5pt Arial';
            ctx.fillStyle = 'white';
            ctx.globalAlpha = 0.7;
            // ctx.fillText('Press space to pause or resume', 290, 572);
            ctx.fillText('上下左右控制角色移动', 600, 660);
            ctx.globalAlpha = 1;
        },
        handleInput: function (keyCode){
            if(keyCode === 'enter'){
                game.reset();
                game.start();
            }
        }
    };

    // 初始化游戏，游戏开始
    var game = new Game();

    // 素材加载，图片列表
    Resources.load([
        'images/bg_tile.png',
        'images/enemy.png',
        'images/player.png',
        'images/basketball.png',
        'images/barrier.png',
        'images/heart.png'
    ]);

    // 加载完触发回调函数
    Resources.onReady(function(){
        game.start();
    });

    //事件监听
    document.addEventListener('keydown', function (e) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down',
            13: 'enter'
        };
        player.handleInput(allowedKeys[e.keyCode]);
        game.handleInput(allowedKeys[e.keyCode]);
    });
})(this);