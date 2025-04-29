import { getDOMElements, clearResults } from './DOM.js';
import { revealPick, revealResultID, ONE_SECOND_DELAY } from './reveal.js';
import { addLotteryTeams, addNonLotteryTeams, applyChanges, getResultID } from './draw.js';

let controller;

export async function handleDraft(year, currentRunID) {
    const { draftTeamArray, resultIDElement } = getDOMElements();

    clearResults(draftTeamArray, resultIDElement);
    if (controller) controller.abort();
    controller = new AbortController();

    const { order: initialOrder, chance: initialChance, change, lotteryTeams } = 
        await import(`../year/${year}.js`);

    let order = [...initialOrder];
    let chance = [...initialChance];

    let { lotteryOrder, remainingOrder } = 
        addLotteryTeams(order, chance, lotteryTeams);
    lotteryOrder = addNonLotteryTeams(lotteryOrder, remainingOrder);
    applyChanges(lotteryOrder, initialOrder, change);

    const resultID = getResultID(lotteryOrder, initialOrder, lotteryTeams);

    let delay = 0;
    const finalDelay = revealAllPicks(lotteryOrder, lotteryTeams, delay, 
        currentRunID, draftTeamArray, controller.signal);
    revealResultID(resultID, finalDelay + ONE_SECOND_DELAY, 
        currentRunID, currentRunID, resultIDElement, controller.signal);
}

function revealAllPicks(lotteryOrder, lotteryTeamsCount, delay, currentRunID, draftTeamArray, signal) {
    // Non-lottery picks
    for (let i = 0; i < lotteryOrder.length - lotteryTeamsCount; i++) {
        delay = revealPick(
            lotteryOrder.length - (i + 1),
            lotteryOrder[lotteryOrder.length - (i + 1)],
            delay + ONE_SECOND_DELAY,
            currentRunID,
            currentRunID,
            draftTeamArray,
            signal
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
            draftTeamArray,
            signal 
        );
    }

    // Top 2 lottery picks
    delay = revealPick(1, lotteryOrder[1], delay + ONE_SECOND_DELAY * 5, currentRunID, currentRunID, draftTeamArray, signal);
    delay = revealPick(0, lotteryOrder[0], delay + ONE_SECOND_DELAY, currentRunID, currentRunID, draftTeamArray, signal);

    return delay;
}