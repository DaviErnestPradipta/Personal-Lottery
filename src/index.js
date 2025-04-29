import './style.css';
import { getDOMElements } from './helper/DOM.js';
import { handleDraft } from './helper/controller.js';

let currentRunID = 0;

document.addEventListener('DOMContentLoaded', () => {
    const { yearSelect, startButton } = getDOMElements();

    startButton.addEventListener('click', () => {
        const selectedYear = yearSelect.value;
        handleDraft(selectedYear, currentRunID);
        currentRunID++;
    });
});