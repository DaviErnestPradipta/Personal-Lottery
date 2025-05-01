import { getDOMElements, clearResults, addTradeShift, applyLotteryBorder } from './DOM.js';
import { revealPick, revealResultID, ONE_SECOND_DELAY } from './reveal.js';
import { addLotteryTeams, addNonLotteryTeams, applyChanges, getResultID } from './draw.js';

let controller;

export async function handleDraft(year, currentRunID) {
    if (controller) controller.abort();
    controller = new AbortController();

    const { draftTeamArray, resultIDElement, actualIDElement } = getDOMElements();
    clearResults(draftTeamArray, resultIDElement, actualIDElement);

    const data = await loadDraftData(year);
    applyLotteryBorder(draftTeamArray, data.lotteryTeams);

    const resultID = getResultID(data.lotteryOrder, data.initialOrder, data.lotteryTeams);
    const actualID = getResultID(data.actualOrder, data.initialOrder, data.lotteryTeams);

    const finalDelay = runRevealSequence(
        data.lotteryOrder,
        data.lotteryTeams,
        currentRunID,
        draftTeamArray,
        controller.signal
    );

    revealResultID(
        resultID,
        finalDelay + ONE_SECOND_DELAY,
        currentRunID,
        currentRunID,
        resultIDElement,
        controller.signal,
        'Result ID'
    );

    revealResultID(
        actualID,
        finalDelay + ONE_SECOND_DELAY,
        currentRunID,
        currentRunID,
        actualIDElement,
        controller.signal,
        'Actual ID'
    );
}

async function loadDraftData(year) {
    const {
        order: initialOrder,
        chance: initialChance,
        actual,
        lotteryTeams,
        change,
    } = await import(`../year/${year}.js`);

    let order = [...initialOrder];
    let chance = [...initialChance];
    let actualOrder = actual.map(i => order[i]);
    let { lotteryOrder, remainingOrder } = addLotteryTeams(order, chance, lotteryTeams);
    
    lotteryOrder = addNonLotteryTeams(lotteryOrder, remainingOrder);
    applyChanges(lotteryOrder, initialOrder, change);
    addTradeShift(change, initialOrder);
    
    return { initialOrder, lotteryOrder, lotteryTeams, actualOrder };
}

function runRevealSequence(
    lotteryOrder,
    lotteryTeamsCount,
    currentRunID,
    draftTeamArray,
    signal) {
    let delay = 0;

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
            lotteryOrder[lotteryOrder.length - 
                (lotteryOrder.length - lotteryTeamsCount + i + 1)],
            delay + ONE_SECOND_DELAY * 3,
            currentRunID,
            currentRunID,
            draftTeamArray,
            signal
        );
    }

    // Top 2 lottery picks
    delay = revealPick(1, lotteryOrder[1], delay + ONE_SECOND_DELAY * 5, 
        currentRunID, currentRunID, draftTeamArray, signal);
    delay = revealPick(0, lotteryOrder[0], delay + ONE_SECOND_DELAY, 
        currentRunID, currentRunID, draftTeamArray, signal);

    return delay;
}