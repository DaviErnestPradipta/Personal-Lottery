import "./style.css";
import { lotteryOrder } from "./lottery.js";

document.addEventListener('DOMContentLoaded', () => {
    const draftTeamElements = document.querySelectorAll('.draft-team');
    const draftTeamArray = [...draftTeamElements];

    draftTeamArray.forEach((teamElement, index) => {
        setTimeout(() => {
            teamElement.textContent = lotteryOrder[index];
        }, 1000 * (13 - index));
    });
});