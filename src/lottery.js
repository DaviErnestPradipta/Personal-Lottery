import {order, change} from './2025.js';
export const lotteryOrder = [];
let chance = [140, 140, 140, 125, 105, 90, 75, 60, 38, 37, 18, 17, 8, 7];

// Initialization
addLotteryTeams();
addNonLotteryTeams();
applyChanges();

// Main Functions
function addLotteryTeams() {
    for (let i = 0; i < 4; i++) {
        const totalChance = getTotalChance(chance);
        const lotteryNumber = getLotteryNumber(totalChance);
        const lotteryIndex = getLotteryIndex(lotteryNumber);
        lotteryOrder.push(order[lotteryIndex]);
        chance[lotteryIndex] = 0;
    }
}

function addNonLotteryTeams() {
    for (let i = 0; i < chance.length; i++) {
        if (chance[i] != 0) lotteryOrder.push(order[i]);
    }
}

function applyChanges(change) {
    for (let i = 0; i < change.length; i++) {
        const lotteryResult = findTeamIndex(order[change[i][0]]);
        if (lotteryResult < change[i][1] || lotteryResult > change[i][2]) {
            lotteryOrder[lotteryResult] = change[i][3];
        }        
    }
}

// Helper Functions
function getTotalChance(chance) {
    let totalChance = 0;
    for (let i = 0; i < chance.length; i++) totalChance += chance[i];
    return totalChance;
}

function getLotteryNumber(totalChance) {
    return Math.floor(Math.random() * totalChance) + 1;
}

function getLotteryIndex(lotteryNumber) {
    let cumulativeChance = 0;
    for (let i = 0; i < chance.length; i++) {
        cumulativeChance += chance[i];
        if (lotteryNumber <= cumulativeChance) return i;
    }
}

function findTeamIndex(teamName) {
    for (let i = 0; i < lotteryOrder.length; i++) {
        if (lotteryOrder[i] === teamName) return i;
    }
}