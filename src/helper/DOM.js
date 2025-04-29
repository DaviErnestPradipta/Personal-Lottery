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