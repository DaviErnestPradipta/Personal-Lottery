import "./style.css";
import { lotteryOrder } from "./lottery.js";

document.addEventListener('DOMContentLoaded', () => {
    const draftTeamElements = document.querySelectorAll('.draft-team');
    const draftTeamArray = [...draftTeamElements];

    // Use a delay between each reveal, based on the index
    draftTeamArray.forEach((teamElement, index) => {
        setTimeout(() => {
            teamElement.textContent = lotteryOrder[index];
        }, 1000 * (13 - index)); // 1000 ms * (13 - index) to create the delay
    });
});