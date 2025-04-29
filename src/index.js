import "./style.css";
import { lotteryOrder, resultID, lotteryTeamCount as lotteryTeams } from "./lottery.js";

const ONE_SECOND = 1000;

document.addEventListener('DOMContentLoaded', () => {
    const draftTeamElements = document.querySelectorAll('.draft-team');
    const draftTeamArray = [...draftTeamElements];
    const resultIDElement = document.querySelector('.result-ID');
    let totalDelay = 0;

    // Reveal non-lottery picks normally
    for (let i = 0; i < lotteryOrder.length - lotteryTeams; i++) {
        totalDelay += ONE_SECOND;
        setTimeout(() => {
            draftTeamArray[lotteryOrder.length - (i + 1)].textContent = 
            lotteryOrder[lotteryOrder.length - (i + 1)];
        }, totalDelay);
    }

    // Reveal lottery picks outside the top 2
    for (let i = 0; i < lotteryTeams - 2; i++) {
        totalDelay += ONE_SECOND * 3;
        setTimeout(() => {
            draftTeamArray[lotteryTeams - (i + 1)].textContent = 
            lotteryOrder[lotteryOrder.length - (i + 1)];
        }, totalDelay);
    }
    
    // Reveal pick 2
    totalDelay += ONE_SECOND * 5;
    setTimeout(() => {
        draftTeamArray[1].textContent = lotteryOrder[1];
    }, totalDelay);

    // Reveal pick 1
    totalDelay += ONE_SECOND;
    setTimeout(() => {
        draftTeamArray[0].textContent = lotteryOrder[0];
    }, totalDelay);

    // Reveal resultID
    totalDelay += ONE_SECOND;
    setTimeout(() => {
        resultIDElement.textContent = `Result ID: ${resultID}`;
    }, totalDelay);
});