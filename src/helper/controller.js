import { getDOMElements, clearResults } from './DOM.js';
import { revealPick, revealResultID, ONE_SECOND_DELAY } from './reveal.js';
import { addLotteryTeams, addNonLotteryTeams, applyChanges, getResultID } from './draw.js';

export async function handleDraft(year, currentRunID) {
    const { draftTeamArray, resultIDElement } = getDOMElements();

    clearResults(draftTeamArray, resultIDElement);

    const { order: initialOrder, chance: initialChance, change, lotteryTeams } = 
        await import(`../year/${year}.js`);

    let order = [...initialOrder];
    let chance = [...initialChance];

    let { lotteryOrder, remainingOrder } = 
        addLotteryTeams(order, chance, lotteryTeams);
    lotteryOrder = addNonLotteryTeams(lotteryOrder, remainingOrder);
    applyChanges(lotteryOrder, initialOrder, change);

    const resultID = getResultID(lotteryOrder, initialOrder, lotteryTeams);

    // Begin the reveal process
    let delay = 0;
    revealAllPicks(lotteryOrder, lotteryTeams, delay, currentRunID, draftTeamArray);
    revealResultID(resultID, delay + ONE_SECOND_DELAY, currentRunID, resultIDElement);
}

function revealAllPicks(lotteryOrder, lotteryTeamsCount, delay, currentRunID, draftTeamArray) {
    // Non-lottery picks
    for (let i = 0; i < lotteryOrder.length - lotteryTeamsCount; i++) {
        delay = revealPick(
            lotteryOrder.length - (i + 1),
            lotteryOrder[lotteryOrder.length - (i + 1)],
            delay + ONE_SECOND_DELAY,
            currentRunID,
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
            currentRunID,
            currentRunID,
            draftTeamArray
        );
    }

    // Top 2 lottery picks
    delay = revealPick(1, lotteryOrder[1], delay + ONE_SECOND_DELAY * 5, currentRunID, currentRunID, draftTeamArray);
    delay = revealPick(0, lotteryOrder[0], delay + ONE_SECOND_DELAY, currentRunID, currentRunID, draftTeamArray);
}