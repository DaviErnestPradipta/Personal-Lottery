export const getDOMElements = () => {
    return {
        yearSelect: document.getElementById('year-select'),
        startButton: document.getElementById('start-button'),
        draftTeamArray: [...document.querySelectorAll('.draft-team')],
        resultIDElement: document.querySelector('.result-ID'),
    };
};

export const clearResults = (draftTeamArray, resultIDElement) => {
    draftTeamArray.forEach(el => el.textContent = '');
    resultIDElement.textContent = '';
};

// New function here
export const addTradeShift = (change, order) => {
    const tradeShiftList = document.querySelector('.trade-shift ul');

    // Clear the existing list items
    tradeShiftList.innerHTML = '';

    // Add new list items
    change.forEach(([index, lowerLimit, upperLimit, newOwner]) => {
        const originalTeam = order[index].slice(0, 3); // First three characters of the team
        const newOwnerTeam = newOwner.split('>').pop().slice(0, 3); // Last three characters of the new owner
        const listItem = document.createElement('li');
        listItem.textContent = `${originalTeam}: Keeps pick if ${lowerLimit + 1}-${upperLimit + 1} (${newOwnerTeam})`;
        tradeShiftList.appendChild(listItem);
    });
};