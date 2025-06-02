document.addEventListener('DOMContentLoaded', () => {
    const scoreTableBody = document.querySelector('#scoreTable tbody');
    const clearScoresBtn = document.getElementById('clearScoresBtn');

    function loadScores() {
        const scores = JSON.parse(localStorage.getItem('ticTacToeScores')) || [];
        scoreTableBody.innerHTML = ''; // Clear existing rows

        if (scores.length === 0) {
            const row = scoreTableBody.insertRow();
            const cell = row.insertCell();
            cell.colSpan = 4;
            cell.textContent = 'No scores recorded yet.';
            cell.style.textAlign = 'center';
            return;
        }

        scores.sort((a, b) => new Date(b.date) - new Date(a.date)); // Show most recent first

        scores.forEach(score => {
            const row = scoreTableBody.insertRow();
            row.insertCell().textContent = score.date;
            row.insertCell().textContent = score.player1;
            row.insertCell().textContent = score.player2;
            row.insertCell().textContent = score.winner;
        });
    }

    clearScoresBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all scores? This cannot be undone.')) {
            localStorage.removeItem('ticTacToeScores');
            loadScores(); // Refresh the table
        }
    });

    // Load scores when the page is opened
    loadScores();
});
