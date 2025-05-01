export const getDOMElements = () => {
    return {
        yearSelect: document.getElementById('year-select'),
        startButton: document.getElementById('start-button'),
        draftTeamArray: [...document.querySelectorAll('.draft-team')],
        resultIDElement: document.querySelector('.result-ID'),
        actualIDElement: document.querySelector('.actual-ID'),
    };
};

export const clearResults = (draftTeamArray, resultIDElement, actualIDElement) => {
    draftTeamArray.forEach(el => el.textContent = '');
    resultIDElement.textContent = '';
    actualIDElement.textContent = '';
};

export const addTradeShift = (change, order) => {
    const tradeShiftList = document.querySelector('.trade-shift ul');
    tradeShiftList.innerHTML = '';

    change.forEach(([index, lowerLimit, upperLimit, newOwner]) => {
        const originalTeam = order[index].slice(0, 3);
        const newOwnerTeam = newOwner.split('>').pop().slice(0, 3);
        const listItem = document.createElement('li');
        listItem.textContent = `${originalTeam} KEEPS PICK IF ${
            lowerLimit === upperLimit ? lowerLimit + 1 : `${lowerLimit + 1}-${upperLimit + 1}`
        } (${newOwnerTeam})`;          
        tradeShiftList.appendChild(listItem);
    });
};

export const applyLotteryBorder = (draftTeamArray, lotteryTeamsCount) => {
    draftTeamArray.forEach(el => el.parentElement.classList.remove('lottery-separator'));
    draftTeamArray[lotteryTeamsCount - 1].parentElement.classList.add('lottery-separator');
};