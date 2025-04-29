const ONE_SECOND = 1000;

export const revealPick = (index, team, delay, runID, currentRunID, draftTeamArray, signal) => {
    const timeoutId = setTimeout(() => {
        if (runID === currentRunID && !signal.aborted) {
            draftTeamArray[index].textContent = team;
        }
    }, delay);

    signal.addEventListener('abort', () => clearTimeout(timeoutId));  // Abort the timeout if the signal is aborted
    return delay;
};

export const revealResultID = (resultID, delay, runID, currentRunID, resultIDElement, signal) => {
    const timeoutId = setTimeout(() => {
        if (runID === currentRunID && !signal.aborted) {
            resultIDElement.textContent = `Result ID: ${resultID}`;
        }
    }, delay);

    signal.addEventListener('abort', () => clearTimeout(timeoutId));  // Abort the timeout if the signal is aborted
};

export const ONE_SECOND_DELAY = ONE_SECOND;