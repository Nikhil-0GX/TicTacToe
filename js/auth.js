document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const player2Group = document.getElementById('player2Group');
    const player2Input = document.getElementById('player2');
    const gameModeRadios = document.querySelectorAll('input[name="gameMode"]');

    function togglePlayer2Input(isPvp) {
        if (isPvp) {
            player2Group.style.display = 'block';
            player2Input.required = true;
        } else {
            player2Group.style.display = 'none';
            player2Input.required = false;
        }
    }

    // Initial state based on checked radio
    const initialGameModeIsPvp = document.getElementById('pvp').checked;
    togglePlayer2Input(initialGameModeIsPvp);

    gameModeRadios.forEach(radio => {
        radio.addEventListener('change', (event) => {
            togglePlayer2Input(event.target.value === 'pvp');
        });
    });

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const gameMode = document.querySelector('input[name="gameMode"]:checked').value;
            const player1NameInput = document.getElementById('player1');
            const player1Name = player1NameInput.value.trim();
            let player2Name = '';

            if (!player1Name) {
                alert('Please enter a name for Player 1.');
                player1NameInput.focus();
                return;
            }

            localStorage.setItem('gameMode', gameMode);
            localStorage.setItem('player1Name', player1Name);

            if (gameMode === 'pvp') {
                player2Name = player2Input.value.trim();
                if (!player2Name) {
                    alert('Please enter a name for Player 2.');
                    player2Input.focus();
                    return;
                }
                if (player1Name.toLowerCase() === player2Name.toLowerCase()) {
                    alert('Player names must be different.');
                    player2Input.focus();
                    return;
                }
                localStorage.setItem('player2Name', player2Name);
            } else {
                // Player vs Computer
                localStorage.setItem('player2Name', 'Computer'); 
            }

            window.location.href = 'index.html';
        });
    }

    // Clear player names if navigating away from game or login page to non-game pages
    // This is a simple way to handle "New Game (Different Players)" logic
    // More robust state management might be needed for complex scenarios
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage !== 'index.html' && currentPage !== 'login.html') {
        // If we are on rules.html or scores.html, don't clear if coming from game/login
        // This logic is imperfect, ideally use more specific flags or session storage
    }

    // If on index.html and no player names, set defaults or redirect to login
    if (currentPage === 'index.html') {
        let p1 = localStorage.getItem('player1Name');
        let p2 = localStorage.getItem('player2Name');

        if (!p1 || !p2) {
            // If not set, could redirect to login.html or allow guest play
            // For now, we assume the main script.js will handle guest names if needed
            console.log('Player names not set, game will use defaults or prompt.');
        }
    }
});
