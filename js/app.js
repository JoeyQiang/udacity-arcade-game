var Player = function (x, y, w, h, lives) {
    this.x = x;
    this.y = y;
    this.originalX = x;
    this.originalY = y;
    this.originalLives = lives;
    this.width = w;
    this.height = h;
    this.lives = lives;
    this.score = 0;
    this.success = false;
    this.gameOver = false;
    this.image = 'images/player.png';
};

Player.prototype = {
    checkCollision: function (player, objectList) {
        var type = isCollided(player, objectList);
        if (type !== 'undefined') {
            if (type === 'enemy') {
                this.lives--;
                player.moveBack();
                if (this.lives === 0) {
                    // 游戏失败结束
                    this.gameOver = true;
                }
            }
            else if (type === 'collection') {
                if (this.score === 5) {
                    // 游戏获胜结束
                    this.success = true;
                    this.gameOver = true;
                }
            }
            else if (type === 'barrier') {
                // this.collided = true;
            }
        }
    },
    moveBack: function () {
        this.x = this.originalX;
        this.y = this.originalY;
    },
    reset: function () {
        this.x = this.originalX;
        this.y = this.originalY;
        this.lives = this.originalLives;
        this.score = 0;
        this.success = false;
        this.gameOver = false;
    },
    update: function () {
        this.checkCollision(player, allNonBarriers);
    },
    render: function () {
        ctx.drawImage(Resources.get(this.image), this.x, this.y);
    },
    handleInput: function (keyCode) {
        if (player.gameOver === true) {
            return;
        }
        // 像左移动
        if (keyCode === 'left' && this.x > 114) {
            var objB = clonePosition(player, keyCode);
            if (isCollided(objB, allBarriers) !== 'barrier') {
                this.x -= 115;
            }
        }
        // 像右移动
        else if (keyCode === 'right' && this.x < 577) {
            var objB = clonePosition(player, keyCode);
            if (isCollided(objB, allBarriers) !== 'barrier') {
                this.x += 115;
            }
        }
        // 像上移动
        else if (keyCode === 'up' && this.y > 0) {
            var objB = clonePosition(player, keyCode);
            if (isCollided(objB, allBarriers) !== 'barrier') {
                this.y -= 115;
            }
        }
        // 像下移动
        else if (keyCode === 'down' && this.y < 575) {
            var objB = clonePosition(player, keyCode);
            if (isCollided(objB, allBarriers) !== 'barrier') {
                this.y += 115;
            }
        }
    }
};


var Enemy = function (x, y, w, h, speed) {
    this.x = x - 114 * Math.random();
    this.y = y;
    this.originalX = this.x;
    this.originalY = this.y;
    this.width = w;
    this.height = h;
    this.image = 'images/enemy.png';
    this.type = 'enemy';
    this.speed = speed + speed * Math.random();
};

Enemy.prototype = {
    reset: function () {
        this.x = this.originalX;
        this.y = this.originalY;
    },
    update: function (dt) {
        if (this.x > 798) {
            this.x = 798 + 114 * Math.random();
            this.speed = this.speed + (600 - this.speed) * Math.random();
            this.speed = -this.speed;
        }
        else if (this.x < -114) {
            this.x = -114 - 114 * Math.random();
            this.speed = -this.speed;
            this.speed = this.speed + (600 - this.speed) * Math.random();
        }
        this.x += this.speed * dt;
    },
    render: function () {
        ctx.drawImage(Resources.get(this.image), this.x, this.y);
    }
};

var Barrier = function (x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.image = 'images/barrier.png';
    this.type = 'barrier';
};

Barrier.prototype = {
    reset: function () {

    },
    update: function () {

    },
    render: function () {
        ctx.drawImage(Resources.get(this.image), this.x, this.y);
    }
};

var Collection = function (x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.image = 'images/basketball.png';
    this.type = 'collection';
};

Collection.prototype = {
    reset: function () {
        allNonBarriers.length = 5;
        allNonBarriers.push(basketballOne);
        allNonBarriers.push(basketballTwo);
        allNonBarriers.push(basketballThree);
        allNonBarriers.push(basketballFour);
        allNonBarriers.push(basketballFive);
    },
    update: function () {

    },
    render: function () {
        ctx.drawImage(Resources.get(this.image), this.x, this.y);
    },
    remove: function () {
        var index;
        for (var i = 0; i < allNonBarriers.length; i++) {
            if (this == allNonBarriers[i]) {
                index = i;
                break;
            }
        }
        if (index > -1) {
            allNonBarriers.splice(index, 1);
            player.score++;
        }
    }
};

function isCollided(objA, objectsList) {
    //返回碰撞物的类别
    var type = undefined;
    objA.t = objA.y;
    objA.b = objA.t + objA.height;
    objA.l = objA.x;
    objA.r = objA.l + objA.width;
    // 对象的上下左右，循环判断是否有冲突
    objectsList.forEach(function (object) {
        object.t = object.y;
        object.b = object.t + object.height;
        object.l = object.x;
        object.r = object.l + object.width;

        if (objA.t > object.b || objA.b < object.t || objA.l > object.r || objA.r < object.l) {
        }
        else {
            type = object.type;
            if (type == 'collection') {
                object.remove();
            }
        }
    })
    return type;
};

function clonePosition(objA, direction) {
    var objB = {};
    objB.x = objA.x;
    objB.y = objA.y;
    objB.width = objA.width;
    objB.height = objA.height;

    if (direction == 'left') {
        objB.x -= 15;
    }
    else if (direction == 'right') {
        objB.x += 15;
    }
    else if (direction == 'up') {
        objB.y -= 15;
    }
    else if (direction == 'down') {
        objB.y += 15;
    }
    return objB;
}


//初始化对象
//初始化玩家
var player = new Player(345, 575, 114, 114, 3);

//初始化敌人
var allNonBarriers = [];
var enemyOne = new Enemy(-114, 0, 114, 114, 300);
var enemyTwo = new Enemy(-114, 115, 114, 114, 300);
var enemyThree = new Enemy(-114, 230, 114, 114, 300);
var enemyFour = new Enemy(-114, 345, 114, 114, 300);
var enemyFive = new Enemy(-114, 460, 114, 114, 300);
allNonBarriers.push(enemyOne);
allNonBarriers.push(enemyTwo);
allNonBarriers.push(enemyThree);
allNonBarriers.push(enemyFour);
allNonBarriers.push(enemyFive);

//初始化收集物
var basketballOne = new Collection(0, 0, 114, 114);
var basketballTwo = new Collection(690, 0, 114, 114);
var basketballThree = new Collection(460, 115, 114, 114);
var basketballFour = new Collection(115, 230, 114, 114);
var basketballFive = new Collection(690, 345, 114, 114);
allNonBarriers.push(basketballOne);
allNonBarriers.push(basketballTwo);
allNonBarriers.push(basketballThree);
allNonBarriers.push(basketballFour);
allNonBarriers.push(basketballFive);

//初识化障碍物
var allBarriers = [];
var barrierOne = new Barrier(115, 115, 114, 114);
var barrierTwo = new Barrier(575, 115, 114, 114);
var barrierThree = new Barrier(230, 230, 114, 114);
var barrierFour = new Barrier(690, 230, 114, 114);
var barrierFive = new Barrier(575, 345, 114, 114);

allBarriers.push(barrierOne);
allBarriers.push(barrierTwo);
allBarriers.push(barrierThree);
allBarriers.push(barrierFour);
allBarriers.push(barrierFive);

//所有物体数组
var objectList = allBarriers.concat(allNonBarriers);













