import './style.css';
import { getDOMElements, clearResults } from './domHandlers.js';
import { revealPick, revealResultID, ONE_SECOND_DELAY } from './reveal.js';
import { addLotteryTeams, addNonLotteryTeams, applyChanges, getResultID } from './drawLogic.js';

let currentRunID = 0;

document.addEventListener('DOMContentLoaded', () => {
    const { yearSelect, startButton, draftTeamArray, resultIDElement } = getDOMElements();

    startButton.addEventListener('click', async () => {
        currentRunID++;
        const runID = currentRunID;
        const selectedYear = yearSelect.value;
        clearResults(draftTeamArray, resultIDElement);

        const { order: initialOrder, chance: initialChance, change, lotteryTeams: lotteryTeamsCount } = await import(`./year/${selectedYear}.js`);

        let order = [...initialOrder];
        let chance = [...initialChance];

        let { lotteryOrder, remainingOrder } = addLotteryTeams(order, chance, lotteryTeamsCount);
        lotteryOrder = addNonLotteryTeams(lotteryOrder, remainingOrder);
        applyChanges(lotteryOrder, initialOrder, change);
        const resultID = getResultID(lotteryOrder, initialOrder, lotteryTeamsCount);

        let delay = 0;

        // Non-lottery picks
        for (let i = 0; i < lotteryOrder.length - lotteryTeamsCount; i++) {
            delay = revealPick(
                lotteryOrder.length - (i + 1),
                lotteryOrder[lotteryOrder.length - (i + 1)],
                delay + ONE_SECOND_DELAY,
                runID,
                currentRunID,
                draftTeamArray
            );
        }

        // Lottery picks (except top 2)
        for (let i = 0; i < lotteryTeamsCount - 2; i++) {
            delay = revealPick(
                lotteryTeamsCount - (i + 1),
                lotteryOrder[lotteryOrder.length - (lotteryOrder.length - lotteryTeamsCount + i + 1)],
                delay + ONE_SECOND_DELAY * 3,
                runID,
                currentRunID,
                draftTeamArray
            );
        }

        if (lotteryOrder.length > 1) {
            delay = revealPick(1, lotteryOrder[1], delay + ONE_SECOND_DELAY * 5, runID, currentRunID, draftTeamArray);
        }
        if (lotteryOrder.length > 0) {
            delay = revealPick(0, lotteryOrder[0], delay + ONE_SECOND_DELAY, runID, currentRunID, draftTeamArray);
        }

        revealResultID(resultID, delay + ONE_SECOND_DELAY, runID, currentRunID, resultIDElement);
    });
});