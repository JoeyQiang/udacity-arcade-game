// Enemies our player must avoid
var Enemy = function (x, y, width, height, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.originY = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype = {
    // Move enemy on the screen
    update: function (dt) {
        this.x += this.speed * dt;
        if (this.x >= 470) {
            this.reset();
        }
    },
    reset: function () {
        this.x = Math.random() * -300;
        this.y = this.originalY;
    },
// Draw enemy on the screen
    render: function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y, width, height, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.originY = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};
Player.prototype = {
    update: function () {

    },
    render: function () {

    },
    handleInput: function (keyCode) {

    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemyOne = new Enemy(15, 139, 80, 62, 100);
allEnemies.push(enemyOne);
var player = new Player(218.5, 467);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
