import "./style.css";

const ONE_SECOND = 1000;

document.addEventListener('DOMContentLoaded', () => {
    const yearSelect = document.getElementById('year-select');
    const startButton = document.getElementById('start-button');
    const draftTeamElements = document.querySelectorAll('.draft-team');
    const draftTeamArray = [...draftTeamElements];
    const resultIDElement = document.querySelector('.result-ID');

    const clearResults = () => {
        draftTeamArray.forEach(element => {
            element.textContent = '';
        });
        resultIDElement.textContent = '';
    };

    const revealPick = (index, team, delay) => {
        setTimeout(() => {
            draftTeamArray[index].textContent = team;
        }, delay);
        return delay;
    };

    const revealResultID = (resultID, delay) => {
        setTimeout(() => {
            resultIDElement.textContent = `Result ID: ${resultID}`;
        }, delay);
    };

    startButton.addEventListener('click', async () => {
        const selectedYear = yearSelect.value;
        clearResults();

        try {
            const module = await import(`./year/${selectedYear}.js`);
            const initialOrder = module.order;
            const change = module.change;
            const initialChance = module.chance;
            const lotteryTeamsCount = module.lotteryTeams;

            const lotteryOrder = [];
            let order = [...initialOrder];
            let chance = [...initialChance];

            // Main Functions
            const addLotteryTeams = () => {
                for (let i = 0; i < lotteryTeamsCount; i++) {
                    const totalChance = getTotalChance(chance);
                    const lotteryNumber = getLotteryNumber(totalChance);
                    const lotteryIndex = getLotteryIndex(lotteryNumber);
                    lotteryOrder.push(order[lotteryIndex]);
                    order.splice(lotteryIndex, 1);
                    chance.splice(lotteryIndex, 1);
                }
            };

            const addNonLotteryTeams = () => {
                for (let i = 0; i < order.length; i++) lotteryOrder.push(order[i]);
            };

            const applyChanges = (change) => {
                for (let i = 0; i < change.length; i++) {
                    const teamName = initialOrder[change[i][0]];
                    const lotteryResult = getTeamIndex(teamName);
                    if (lotteryResult !== -1 && (lotteryResult < change[i][1] || lotteryResult > change[i][2])) {
                        lotteryOrder[lotteryResult] = change[i][3];
                    }
                }
            };

            const getResultID = (lotteryOrder) => {
                let resultID = 0;
                const totalTeams = lotteryOrder.length;
                for (let i = 0; i < lotteryTeamsCount - 1; i++) {
                    const teamIndex = initialOrder.indexOf(lotteryOrder[i]);
                    resultID += teamIndex * getPermutation(totalTeams - (i + 1), lotteryTeamsCount - (i + 1));
                }
                const lastTeamIndex = initialOrder.indexOf(lotteryOrder[lotteryTeamsCount - 1]);
                resultID += lastTeamIndex;
                return resultID;
            };

            // Helper Functions
            const getTotalChance = (chanceArray) => {
                return chanceArray.reduce((sum, value) => sum + value, 0);
            };

            const getLotteryNumber = (totalChance) => {
                return Math.floor(Math.random() * totalChance) + 1;
            };

            const getLotteryIndex = (lotteryNumber) => {
                let cumulativeChance = 0;
                for (let i = 0; i < chance.length; i++) {
                    cumulativeChance += chance[i];
                    if (lotteryNumber <= cumulativeChance) {
                        return i;
                    }
                }
                return -1; // Should not happen
            };

            const getTeamIndex = (teamName) => {
                for (let i = 0; i < lotteryOrder.length; i++) {
                    if (lotteryOrder[i] === teamName) {
                        return i;
                    }
                }
                return -1;
            };

            const getPermutation = (totalObjects, objectsChosen) => {
                return getFactorial(totalObjects) / getFactorial(totalObjects - objectsChosen);
            };

            const getFactorial = (number) => {
                let result = 1;
                while (number > 1) {
                    result *= number;
                    number--;
                }
                return result;
            };

            addLotteryTeams();
            addNonLotteryTeams();
            applyChanges(change);
            const resultID = getResultID(lotteryOrder);

            let totalDelay = 0;

            // Reveal non-lottery picks
            for (let i = 0; i < lotteryOrder.length - lotteryTeamsCount; i++) {
                totalDelay = revealPick(
                    lotteryOrder.length - (i + 1),
                    lotteryOrder[lotteryOrder.length - (i + 1)],
                    totalDelay + ONE_SECOND
                );
            }

            // Reveal lottery picks outside the top 2
            for (let i = 0; i < lotteryTeamsCount - 2; i++) {
                totalDelay = revealPick(
                    lotteryTeamsCount - (i + 1),
                    lotteryOrder[lotteryOrder.length - (lotteryOrder.length - lotteryTeamsCount + i + 1)],
                    totalDelay + ONE_SECOND * 3
                );
            }

            // Reveal pick 2
            if (lotteryOrder.length > 1) {
                totalDelay = revealPick(1, lotteryOrder[1], totalDelay + ONE_SECOND * 5);
            }

            // Reveal pick 1
            if (lotteryOrder.length > 0) {
                totalDelay = revealPick(0, lotteryOrder[0], totalDelay + ONE_SECOND);
            }

            // Reveal resultID
            revealResultID(resultID, totalDelay + ONE_SECOND);

        } catch (error) {
            console.error("Error loading year data:", error);
            resultIDElement.textContent = "Error loading data for the selected year.";
        }
    });
});