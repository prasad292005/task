// Simulated Match Data
const matches = [
    {
        id: 1,
        league: "Premier League",
        home: "Man City",
        away: "Liverpool",
        homeLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png",
        awayLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png",
        scoreHome: 1,
        scoreAway: 1,
        time: 55,
        status: "LIVE"
    },
    {
        id: 2,
        league: "Serie A",
        home: "Napoli",
        away: "AC Milan",
        homeLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/SSC_Neapel.svg/1200px-SSC_Neapel.svg.png",
        awayLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_of_AC_Milan.svg/1200px-Logo_of_AC_Milan.svg.png",
        scoreHome: 0,
        scoreAway: 2,
        time: 32,
        status: "LIVE"
    },
    {
        id: 3,
        league: "Bundesliga",
        home: "Bayern",
        away: "Dortmund",
        homeLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/1200px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png",
        awayLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/1200px-Borussia_Dortmund_logo.svg.png",
        scoreHome: 3,
        scoreAway: 2,
        time: 88,
        status: "LIVE"
    },
    {
        id: 4,
        league: "La Liga",
        home: "Atletico",
        away: "Sevilla",
        homeLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Atletico_Madrid_2017_logo.svg/1200px-Atletico_Madrid_2017_logo.svg.png",
        awayLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Sevilla_FC_logo.svg/1200px-Sevilla_FC_logo.svg.png",
        scoreHome: 0,
        scoreAway: 0,
        time: 12,
        status: "LIVE"
    }
];

// Spotlight Match Data
let spotlightMatch = {
    scoreHome: 2,
    scoreAway: 1,
    time: 72
};

const container = document.getElementById('score-container');

// Render initial matches
function renderMatches() {
    container.innerHTML = '';
    matches.forEach(match => {
        const card = document.createElement('div');
        card.className = 'match-card';
        card.id = `match-${match.id}`;
        card.innerHTML = `
            <div class="match-card-header">
                <span>${match.league}</span>
                <span class="status-live"><span class="blink">●</span> ${match.time}'</span>
            </div>
            <div class="match-teams">
                <div class="team-row">
                    <img src="${match.homeLogo}" class="mini-logo" alt="${match.home}">
                    <span class="t-name">${match.home}</span>
                </div>
                <div class="score-badge">
                    <span id="score-h-${match.id}">${match.scoreHome}</span> - <span id="score-a-${match.id}">${match.scoreAway}</span>
                </div>
                <div class="team-row right">
                    <span class="t-name">${match.away}</span>
                    <img src="${match.awayLogo}" class="mini-logo" alt="${match.away}">
                </div>
            </div>
            <div class="match-footer">
                <span><i class="fa-solid fa-chart-simple"></i> Match Stats</span>
                <span>Odds: 1.85 / 3.40 / 4.20</span>
            </div>
        `;
        container.appendChild(card);
    });
}

// Update loop
function updateLiveScores() {
    // Update Spotlight Match
    spotlightMatch.time++;
    if (spotlightMatch.time > 90) spotlightMatch.time = 90 + "+";
    document.getElementById('spotlight-time').innerText = spotlightMatch.time + "'";

    // Random goal chance for spotlight
    if (Math.random() < 0.05) {
        if (Math.random() > 0.5) spotlightMatch.scoreHome++; else spotlightMatch.scoreAway++;
        updateSpotlightDisplay();
    }

    // Update Grid Matches
    matches.forEach((match, index) => {
        // Increment Time
        if (typeof match.time === 'number' && match.time < 90) {
            match.time++;
        }

        // Random Goal Event (Low probability)
        if (Math.random() < 0.03) { // 3% chance per tick
            if (Math.random() > 0.5) match.scoreHome++; else match.scoreAway++;

            // Visual feedback for goal
            const card = document.getElementById(`match-${match.id}`);
            card.style.borderColor = "#e63946";
            setTimeout(() => { card.style.borderColor = "#2b2d42"; }, 1000);
        }

        // Update DOM
        const cardTitle = document.querySelector(`#match-${match.id} .status-live`);
        if (cardTitle) cardTitle.innerHTML = `<span class="blink">●</span> ${match.time}'`;

        const scoreElH = document.getElementById(`score-h-${match.id}`);
        const scoreElA = document.getElementById(`score-a-${match.id}`);
        if (scoreElH) scoreElH.innerText = match.scoreHome;
        if (scoreElA) scoreElA.innerText = match.scoreAway;
    });
}

function updateSpotlightDisplay() {
    document.getElementById('spotlight-score-home').innerText = spotlightMatch.scoreHome;
    document.getElementById('spotlight-score-away').innerText = spotlightMatch.scoreAway;

    // Flash effect
    const scoreDisplay = document.querySelector('.score-display');
    scoreDisplay.style.color = '#e63946';
    setTimeout(() => { scoreDisplay.style.color = 'white'; }, 500);
}

// Build
renderMatches();

// Run Simulation Loop every 2 seconds (faster than real time for demo)
setInterval(updateLiveScores, 2000);
