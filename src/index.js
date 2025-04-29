import "./style.css";
import { lotteryOrder, resultID, lotteryTeamCount as lotteryTeams } from "./lottery.js";

const ONE_SECOND = 1000;

document.addEventListener('DOMContentLoaded', () => {
    const draftTeamElements = document.querySelectorAll('.draft-team');
    const draftTeamArray = [...draftTeamElements];
    const resultIDElement = document.querySelector('.result-ID');
    const startButton = document.querySelector('button[type="submit"]');

    const clearResults = () => {
        draftTeamArray.forEach(element => {
            element.textContent = '';
        });
        resultIDElement.textContent = '';
    };

    const revealPick = (index, team, delay) => {
        setTimeout(() => {
            draftTeamArray[index].textContent = team;
        }, delay);
        return delay;
    };

    const revealResultID = (delay) => {
        setTimeout(() => {
            resultIDElement.textContent = `Result ID: ${resultID}`;
        }, delay);
    };

    startButton.addEventListener('click', () => {
        clearResults();
        let totalDelay = 0;
        
        // Reveal non-lottery picks
        for (let i = 0; i < lotteryOrder.length - lotteryTeams; i++) {
            totalDelay = revealPick(
                lotteryOrder.length - (i + 1),
                lotteryOrder[lotteryOrder.length - (i + 1)],
                totalDelay + ONE_SECOND
            );
        }

        // Reveal lottery picks outside the top 2
        for (let i = 0; i < lotteryTeams - 2; i++) {
            totalDelay = revealPick(
                lotteryTeams - (i + 1),
                lotteryOrder[lotteryOrder.length - (i + 1)],
                totalDelay + ONE_SECOND * 3
            );
        }

        // Reveal pick 2
        totalDelay = revealPick(1, lotteryOrder[1], totalDelay + ONE_SECOND * 5);

        // Reveal pick 1
        totalDelay = revealPick(0, lotteryOrder[0], totalDelay + ONE_SECOND);

        // Reveal resultID
        revealResultID(totalDelay + ONE_SECOND);
    });
});