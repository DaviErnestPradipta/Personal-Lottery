// lottery.js
import { 
    order as initialOrder, 
    change, 
    chance as initialChance, 
    lotteryTeams
} from './2025.js';
export const lotteryOrder = [];

let order = [...initialOrder];
let chance = [...initialChance];

// Initialization
addLotteryTeams();
addNonLotteryTeams();
applyChanges(change);
export const resultID = getResultID(lotteryOrder);

// Main Functions
function addLotteryTeams() {
    for (let i = 0; i < lotteryTeams; i++) {
        const totalChance = getTotalChance(chance);
        const lotteryNumber = getLotteryNumber(totalChance);
        const lotteryIndex = getLotteryIndex(lotteryNumber);
        lotteryOrder.push(order[lotteryIndex]);
        order.splice(lotteryIndex, 1);
        chance.splice(lotteryIndex, 1);
    }
}

function addNonLotteryTeams() {
    for (let i = 0; i < order.length; i++) lotteryOrder.push(order[i]);
}

function applyChanges(change) {
    for (let i = 0; i < change.length; i++) {
        const teamName = initialOrder[change[i][0]];
        const lotteryResult = getTeamIndex(teamName);
        // If lotteryResult falls outside the limits, change the pick owner
        if (lotteryResult < change[i][1] || lotteryResult > change[i][2]) {
            lotteryOrder[lotteryResult] = change[i][3];
        }
    }
}

function getResultID(lotteryOrder) {
    let resultID = 0;
    const totalTeams = lotteryOrder.length;
    for (let i = 0; i < lotteryTeams - 1; i++) {
        const teamIndex = initialOrder.indexOf(lotteryOrder[i]);
        resultID += teamIndex * getPermutation(totalTeams - (i + 1), lotteryTeams - (i + 1));
    }
    const lastTeamIndex = initialOrder.indexOf(lotteryOrder[lotteryTeams - 1]);
    resultID += lastTeamIndex;
    return resultID;
}

// Helper Functions
function getTotalChance(chanceArray) {
    return chanceArray.reduce((sum, value) => sum + value, 0);
}

function getLotteryNumber(totalChance) {
    return Math.floor(Math.random() * totalChance) + 1;
}

function getLotteryIndex(lotteryNumber) {
    let cumulativeChance = 0;
    for (let i = 0; i < chance.length; i++) {
        cumulativeChance += chance[i];
        if (lotteryNumber <= cumulativeChance) {
            return i;
        }
    }
    throw new Error("Lottery number did not map to a valid team (chances may be broken).");
}

function getTeamIndex(teamName) {
    for (let i = 0; i < lotteryOrder.length; i++) {
        if (lotteryOrder[i] === teamName) {
            return i;
        }
    }
    throw new Error(`Team ${teamName} not found in lottery order.`);
}

function getPermutation(totalObjects, objectsChosen) {
    return getFactorial(totalObjects) / getFactorial(totalObjects - objectsChosen);
}

function getFactorial(number) {
    let result = 1;
    while (number > 1) {
        result *= number;
        number--; // decrement number, not result!
    }
    return result;
}