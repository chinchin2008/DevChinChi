const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");

const box = 20; // Kích thước ô
let snake, food, direction, score, game;

// Đặt lại trò chơi
function resetGame() {
    snake = [{ x: 9 * box, y: 9 * box }]; // Rắn bắt đầu với một đoạn
    food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box,
    };
    direction = "RIGHT";
    score = 0;
}

// Bắt đầu trò chơi
startButton.addEventListener("click", () => {
    resetGame();
    startButton.style.display = "none";
    game = setInterval(drawGame, 200); // Giảm tốc độ (200ms mỗi khung)
});

// Lắng nghe sự kiện bàn phím
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    else if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

function drawGame() {
    // Xóa canvas
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Vẽ thức ăn
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Vẽ rắn
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "green" : "lightgreen";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "darkgreen";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Di chuyển rắn
    let head = { x: snake[0].x, y: snake[0].y };
    if (direction === "UP") head.y -= box;
    if (direction === "DOWN") head.y += box;
    if (direction === "LEFT") head.x -= box;
    if (direction === "RIGHT") head.x += box;

    // Kiểm tra nếu rắn ăn thức ăn
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box,
        };
    } else {
        snake.pop(); // Xóa phần cuối nếu không ăn thức ăn
    }

    // Thêm đầu mới vào rắn
    snake.unshift(head);

    // Kiểm tra va chạm
    if (
        head.x < 0 || head.x >= canvas.width || 
        head.y < 0 || head.y >= canvas.height || 
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        clearInterval(game);
        startButton.innerText = "Chơi lại";
        startButton.style.display = "block";
        alert(`Kết thúc trò chơi! Điểm số của bạn: ${score}`);
    }

    // Hiển thị điểm số
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(`Điểm: ${score}`, 10, 20);
}

