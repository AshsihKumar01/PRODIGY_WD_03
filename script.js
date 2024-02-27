let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const cells = document.querySelectorAll('.cell');
const resultDisplay = document.getElementById('result');

cells.forEach(cell => cell.addEventListener('click', handleCellClick));

function handleCellClick() {
    const index = this.dataset.index;

    if (board[index] === '' && gameActive) {
        board[index] = currentPlayer;
        this.textContent = currentPlayer;
        
        if (checkWinner()) {
            resultDisplay.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (board.every(cell => cell !== '')) {
            resultDisplay.textContent = 'It\'s a draw!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] !== '' && board[a] === board[b] && board[b] === board[c];
    });
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    resultDisplay.textContent = '';
    cells.forEach(cell => cell.textContent = '');
}
