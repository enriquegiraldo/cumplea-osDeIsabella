document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('es-ES', options);
    
    const countdownElement = document.getElementById('birthday-countdown');
    countdownElement.innerHTML = `¡Hoy ${formattedDate} es tu día especial!`;
    
    createConfetti();
    renderWrappingConfetti();
});

function createConfetti() {
    const confettiCount = 200;
    const container = document.querySelector('.container');
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 5 + 's';
        confetti.style.backgroundColor = getRandomColor();
        document.body.appendChild(confetti);
    }
}

function getRandomColor() {
    const colors = ['#ff6b6b', '#5f27cd', '#ff9ff3', '#54a0ff', '#feca57'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function setupCanvas(id) {
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    return { canvas, ctx };
}

function renderWrappingConfetti() {
    const { canvas, ctx } = setupCanvas('canvas-wrapping');
    const timeDelta = 0.05;
    const xAmplitude = 0.5;
    const yAmplitude = 1;
    const xVelocity = 2;
    const yVelocity = 3;
    let time = 0;
    const confetti = [];
    const colors = ['#ff6b6b', '#5f27cd', '#ff9ff3', '#54a0ff', '#feca57'];

    for (let i = 0; i < 100; i++) {
        const radius = Math.floor(Math.random() * 50) - 10;
        const tilt = Math.floor(Math.random() * 10) - 10;
        const xSpeed = Math.random() * xVelocity - xVelocity / 2;
        const ySpeed = Math.random() * yVelocity;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height - canvas.height;

        confetti.push({
            x,
            y,
            xSpeed,
            ySpeed,
            radius,
            tilt,
            color: colors[Math.floor(Math.random() * colors.length)],
            phaseOffset: i
        });
    }

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach((piece) => {
            piece.y += (Math.cos(piece.phaseOffset + time) + 1) * yAmplitude + piece.ySpeed;
            piece.x += Math.sin(piece.phaseOffset + time) * xAmplitude + piece.xSpeed;
            if (piece.x < 0) piece.x = canvas.width;
            if (piece.x > canvas.width) piece.x = 0;
            if (piece.y > canvas.height) piece.y = 0;
            ctx.beginPath();
            ctx.lineWidth = piece.radius / 2;
            ctx.strokeStyle = piece.color;
            ctx.moveTo(piece.x + piece.tilt + piece.radius / 4, piece.y);
            ctx.lineTo(piece.x + piece.tilt, piece.y + piece.tilt + piece.radius / 4);
            ctx.stroke();
        });
        time += timeDelta;
        requestAnimationFrame(update);
    }
    update();
}

const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
    .confetti-piece {
        position: absolute;
        width: 10px;
        height: 10px;
        top: -10px;
        opacity: 0;
        animation: fall 5s linear infinite;
    }
    @keyframes fall {
        0% { opacity: 1; top: -10px; transform: translateX(0) rotate(0deg); }
        100% { opacity: 0; top: 100vh; transform: translateX(100px) rotate(360deg); }
    }
`;
document.head.appendChild(styleSheet);