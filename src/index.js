import './style.css';
import { getDOMElements } from './helper/DOM.js';
import { handleDraft } from './helper/controller.js';

let currentRunID = 0;

document.addEventListener('DOMContentLoaded', () => {
    const { yearSelect, startButton } = getDOMElements();

    startButton.addEventListener('click', async () => {
        const selectedYear = yearSelect.value;
        await handleDraft(selectedYear, currentRunID);
        currentRunID++;
    });
});