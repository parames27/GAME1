function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fire(ball, ballCoOrds, targetX, targetY) {
    let xDistance = ballCoOrds.x - targetX;
    let yDistance = ballCoOrds.y - targetY;

    let distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
    let time = distance;

    let start = {
        x: ballCoOrds.x,
        y: ballCoOrds.y,
        t: Date.now()
    };

    let difference = {
        x: targetX - ballCoOrds.x,
        y: targetY - ballCoOrds.y,
        t: time
    };

    let fireAction = setInterval(function (curTime = Date.now()) {
        let elapsed = curTime - start.t;
        let ratio = elapsed / difference.t;

        ball.style.left = start.x + difference.x * ratio + "px";
        ball.style.top = start.y + difference.y * ratio + "px";

        if (elapsed >= 1500) {
            clearInterval(fireAction);
        }
    }, 60);
}

const dropBurger = (burger) => {
    let movingDownwards = true;
    const speed = getRandomInt(50, 200);

    let interval = setInterval(function () {
        let burgerCoOrds = burger.getBoundingClientRect();
        let pos1 = burgerCoOrds.top;

        if (pos1 > 650) {
            movingDownwards = false;
        }
        if (pos1 < 100) {
            movingDownwards = true;
        }

        if (movingDownwards) {
            pos1 += 10;
        } else {
            pos1 -= 10;
        }

        burger.style.top = pos1 + "px";
    }, speed);
};

function initializePosition(burger) {
    burger.style.left = getRandomInt(300, 1200) + "px";
}

function handleMouse() {
    let cannonBall = document.getElementById("cannonBall");
    let cannonBallCoOrds = cannonBall.getBoundingClientRect();

    let cannon = document.getElementById("cannon");
    let cannonCoOrds = cannon.getBoundingClientRect();

    document.addEventListener("mousemove", (e) => {
        let angle = Math.atan2(e.pageX - cannonCoOrds.x, -(e.pageY - cannonCoOrds.y)) * (180 / Math.PI);
        angle -= 13;
        cannon.style.transform = `rotate(${angle}deg)`;

        document.addEventListener('click', function (event) {
            event.preventDefault();
            fire(cannonBall, cannonBallCoOrds, event.pageX, event.pageY);
        }, false);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    handleMouse();

    let burger1 = document.getElementById("burger1");
    let burger2 = document.getElementById("burger2");
    let burger3 = document.getElementById("burger3");
    initializePosition(burger1);
    initializePosition(burger2);
    initializePosition(burger3);
    dropBurger(burger1);
    dropBurger(burger2);
    dropBurger(burger3);

    const gameArea = document.getElementById("gameArea");
    const checkCollision = setInterval(function () {
        const cannonBall = document.getElementById("cannonBall");
        const burgerElements = document.getElementsByClassName("burger");

        for (let i = 0; i < burgerElements.length; i++) {
            const burger = burgerElements[i];
            const burgerCoOrds = burger.getBoundingClientRect();
            const cannonBallCoOrds = cannonBall.getBoundingClientRect();

            if (
                cannonBallCoOrds.x < burgerCoOrds.x + burgerCoOrds.width &&
                cannonBallCoOrds.x + cannonBallCoOrds.width > burgerCoOrds.x &&
                cannonBallCoOrds.y < burgerCoOrds.y + burgerCoOrds.height &&
                cannonBallCoOrds.y + cannonBallCoOrds.height > burgerCoOrds.y
            ) {
                clearInterval(checkCollision);
                alert("Game Over: Collision Detected!");
                break;
            }
        }
    }, 100);
});
