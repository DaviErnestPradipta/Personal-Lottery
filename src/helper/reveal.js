const ONE_SECOND = 1000;

const setRevealTimeout = (delay, callback, signal) => {
    const timeoutId = setTimeout(() => {
        if (!signal.aborted) {
            callback();
        }
    }, delay);

    signal.addEventListener('abort', () => clearTimeout(timeoutId));  // Abort the timeout if the signal is aborted
};

export const revealPick = (index, team, delay, runID, currentRunID, draftTeamArray, signal) => {
    if (runID === currentRunID) {
        setRevealTimeout(delay, () => {
            draftTeamArray[index].textContent = team;
        }, signal);
    }
    return delay;
};

export const revealResultID = (resultID, delay, runID, currentRunID, resultIDElement, signal) => {
    if (runID === currentRunID) {
        setRevealTimeout(delay, () => {
            resultIDElement.textContent = `Result ID: ${resultID}`;
        }, signal);
    }
};

export const ONE_SECOND_DELAY = ONE_SECOND;