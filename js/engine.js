// 传入全局变量 this->global
var Engine = (function (global, width, height) {
    // 定义绘制动画需要的参数
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;
        // 定义画布为全局变量，便于其他 JS 文件调用
        global.ctx = ctx;

    // 定义画布大小
    canvas.width = width;
    canvas.height = height;
    doc.body.appendChild(canvas);

    // 初始化函数
    function init() {
        // 还原
        reset();
        // 时间戳，记录的是千分之一秒值
        lastTime = Date.now();
        // 主函数
        main();
    }


    // 主函数，画布不断刷新，同时更新画布内容
    function main() {
        var now = Date.now();
        dt = (now - lastTime) / 1000
        // 画面内容更新，显示器未更新
        update(dt);
        // 画面内容渲染，显示器未更新
        render();
        // 时间戳
        lastTime = now;
        // Javascript 每 1/60 FPS 刷新一次，类似 setTimeout(main, 1000/60)
        win.requestAnimationFrame(main);
    }

    // 还原函数
    function reset() {
        // 游戏重新执行
        // restart();
    }

    // 更新函数
    function update(dt) {
        updateUntities(dt);
        // 检验是否发生碰撞
        // checkCollisions();
    }

    // 更新细节
    function updateUntities(dt) {
        // 玩家更新，一个玩家
        player.update();
        // 敌人更新，多个敌人
        allEnemies.forEach(function (enemy) {
            enemy.update(dt);
        });
    }

    // 渲染函数
    function render() {
        var rowImages = [
                'images/water-block.png',   // 第一行图片
                'images/stone-block.png',   // 第二行图片
                'images/stone-block.png',   // 第三行图片
                'images/stone-block.png',   // 第四行图片
                'images/grass-block.png',   // 第五行图片
                'images/grass-block.png'    // 第六行图片
            ],
            rows = 6,
            cols = 5,
            row,
            col;

        // 定位背景图片位置，图片大小 101 * 83
        for (row = 0; row < rows; row++) {
            for (col = 0; col < cols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 82);
            }
        }

        // 渲染操作元素
        renderUntities();
    }

    // 渲染操作元素函数
    function renderUntities() {
        // 玩家渲染
        player.render();
        // 敌人渲染
        allEnemies.forEach(function (enemy) {
            enemy.render();
        });
    }

    // 素材加载，用到了上期的 Resources 对象
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png'
    ]);

    // 加载完触发回调函数
    Resources.onReady(init);

})(this, 505, 606);