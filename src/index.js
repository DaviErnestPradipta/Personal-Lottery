import "./style.css";
import { lotteryOrder, resultID } from "./lottery.js";

document.addEventListener('DOMContentLoaded', () => {
    const draftTeamElements = document.querySelectorAll('.draft-team');
    const draftTeamArray = [...draftTeamElements];
    const resultIDElement = document.querySelector('.result-ID');

    console.log('lotteryOrder:', lotteryOrder); // 👈 ADD THIS
    console.log('resultID:', resultID);          // 👈 AND THIS

    draftTeamArray.forEach((teamElement, index) => {
        setTimeout(() => {
            teamElement.textContent = lotteryOrder[index];
        }, 1000 * (13 - index));
    });

    resultIDElement.textContent = `Result ID: ${resultID}`;
});