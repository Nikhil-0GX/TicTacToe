document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('board');
    const currentPlayerElement = document.getElementById('currentPlayer');
    const resetBtn = document.getElementById('resetBtn');
    const newGameBtn = document.getElementById('newGameBtn');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;
    let player1Name = localStorage.getItem('player1Name') || 'Player 1';
    let player2Name = localStorage.getItem('player2Name') || 'Player 2';

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function initializeGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        player1Name = localStorage.getItem('player1Name') || 'Player 1';
        player2Name = localStorage.getItem('player2Name') || 'Player 2';
        
        currentPlayerElement.textContent = `${getCurrentPlayerName()}'s turn (${currentPlayer})`;
        renderBoard();
    }

    function renderBoard() {
        boardElement.innerHTML = '';
        board.forEach((cell, index) => {
            const cellElement = document.createElement('button');
            cellElement.classList.add('cell');
            cellElement.textContent = cell;
            if (cell === 'X') cellElement.classList.add('X');
            if (cell === 'O') cellElement.classList.add('O');
            cellElement.addEventListener('click', () => handleCellClick(index));
            boardElement.appendChild(cellElement);
        });
    }

    function handleCellClick(index) {
        if (board[index] !== '' || !gameActive) {
            return;
        }
        board[index] = currentPlayer;
        renderBoard(); // Re-render to show the new move
        checkResult();
    }

    function checkResult() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = board[winCondition[0]];
            let b = board[winCondition[1]];
            let c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            const winnerName = getCurrentPlayerName();
            currentPlayerElement.textContent = `${winnerName} (${currentPlayer}) wins!`;
            gameActive = false;
            saveScore(winnerName);
            return;
        }

        if (!board.includes('')) {
            currentPlayerElement.textContent = 'Game is a Draw!';
            gameActive = false;
            saveScore('Draw');
            return;
        }

        switchPlayer();
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentPlayerElement.textContent = `${getCurrentPlayerName()}'s turn (${currentPlayer})`;
    }

    function getCurrentPlayerName() {
        return currentPlayer === 'X' ? player1Name : player2Name;
    }

    function saveScore(winner) {
        const scores = JSON.parse(localStorage.getItem('ticTacToeScores')) || [];
        const gameResult = {
            date: new Date().toLocaleDateString(),
            player1: player1Name,
            player2: player2Name,
            winner: winner
        };
        scores.push(gameResult);
        localStorage.setItem('ticTacToeScores', JSON.stringify(scores));
    }

    resetBtn.addEventListener('click', initializeGame);

    newGameBtn.addEventListener('click', () => {
        // Clear player names for a new setup
        // localStorage.removeItem('player1Name');
        // localStorage.removeItem('player2Name');
        // Redirect to login to set new players
        window.location.href = 'login.html';
    });

    // Initial setup
    initializeGame();
});
