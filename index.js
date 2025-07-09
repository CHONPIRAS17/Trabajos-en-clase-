const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


const player = {
    x: 50,
    y: 50,
    size: 30,
    color: 'blue',
    speed: 5
};


const enemies = [{
    x: 300,
    y: 300,
    size: 30,
    color: 'red',
    dx: 3,
    dy: 3
},
{
    x: 100,
    y: 200,
    size: 30,
    color: '#facc15',
    dx: -3,
    dy: 3
}];

let scores = 0;
let lives = 3;
let gameOver = false;


function drawBox(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
}


function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function draw() {
    clearCanvas();
    drawBox(player.x, player.y, player.size, player.color);

    enemies.forEach(enemy => {
        drawBox(enemy.x, enemy.y, enemy.size, enemy.color);
    });

}


function updateEnemy() {

    enemies.forEach(enemy => {
        enemy.x += enemy.dx;
        enemy.y += enemy.dy;


        if (enemy.x <= 0 || enemy.x + enemy.size >= canvas.width) {
            enemy.dx *= -1;
        }
        if (enemy.y <= 0 || enemy.y + enemy.size >= canvas.height) {
            enemy.dy *= -1;
        }

    });
}


function checkcollision() {
    enemies.forEach(enemy => {
        if (player.x < enemy.x + enemy.size &&
            player.x + player.size > enemy.x &&
            player.y < enemy.y + enemy.size &&
            player.y + player.size > enemy.y) {

            scores++;
            document.getElementById('score').textContent = scores;

            enemy.x = Math.random() * (canvas.width - enemy.size);
            enemy.y = Math.random() * (canvas.height - enemy.size);

            enemy.dx *= 1.05;
            enemy.dy *= 1.05;
        }
    });
}



function loseLife() {
    lives--;
    document.getElementById('lives').textContent = lives;
    if (lives <= 0) {
        document.getElementById('game-over').style.display = 'block';
        gameOver = true;
        setTimeout(resetGame, 3000);
    }
}


function update() {
    if (gameOver) return;


    draw();
    updateEnemy();
    checkcollision();


    if (
        player.x < 0 || player.x + player.size > canvas.width ||
        player.y < 0 || player.y + player.size > canvas.Height
    ) {
        loseLife();
        player.x = canvas.width / 2;
        player.y = canvas.Height / 2;
    }


    requestAnimationFrame(update);
}


document.addEventListener('keydown', (e) => {
    if (gameOver) return;


    switch (e.key) {
        case 'ArrowUp': player.y -= player.speed; break;
        case 'ArrowDown': player.y += player.speed; break;
        case 'ArrowLeft': player.x -= player.speed; break;
        case 'ArrowRight': player.x += player.speed; break;
    }
});


function resetGame() {
    score = 0;
    lives = 3;
    player.x = 50;
    player.y = 50;

    enemies[0].x = 300;
    enemies[0].y = 300;
    enemies[0].dx = 3;
    enemies[0].dy = 3;

    enemies[1].x = 100;
    enemies[1].y = 200;
    enemies[1].dx = -3;
    enemies[1].dy = 3;

    gameOver = false;
    document.getElementById('score').textContent = score;
    document.getElementById('lives').textContent = lives;
    document.getElementById('game-over').style.display = none;
    update();
}


update();
