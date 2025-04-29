const ONE_SECOND = 1000;

export const revealPick = (index, team, delay, runID, currentRunID, draftTeamArray) => {
    setTimeout(() => {
        if (runID === currentRunID) {
            draftTeamArray[index].textContent = team;
        }
    }, delay);
    return delay;
};

export const revealResultID = (resultID, delay, runID, currentRunID, resultIDElement) => {
    setTimeout(() => {
        if (runID === currentRunID) {
            resultIDElement.textContent = `Result ID: ${resultID}`;
        }
    }, delay);
};

export const ONE_SECOND_DELAY = ONE_SECOND;