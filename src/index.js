import "./style.css";
import { lotteryOrder, resultID } from "./lottery.js";

const ONE_SECOND = 1000;

document.addEventListener('DOMContentLoaded', () => {
    const draftTeamElements = document.querySelectorAll('.draft-team');
    const draftTeamArray = [...draftTeamElements];
    const resultIDElement = document.querySelector('.result-ID');

    // Reveal picks >2 normally
    for (let i = 0; i < lotteryOrder.length - 2; i++) {
        setTimeout(() => {
            draftTeamArray[lotteryOrder.length - (i + 1)].textContent = 
            lotteryOrder[lotteryOrder.length - (i + 1)];
        }, ONE_SECOND * i);
    }

    // Reveal pick 1, pick 2, and resultID simultaneously
    const finalRevealTime = ONE_SECOND * (lotteryOrder.length - 2);
    setTimeout(() => {
        draftTeamArray[0].textContent = lotteryOrder[0];
        draftTeamArray[1].textContent = lotteryOrder[1];
        resultIDElement.textContent = `Result ID: ${resultID}`;
    }, finalRevealTime);
});