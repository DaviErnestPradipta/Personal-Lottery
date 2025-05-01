import { getPermutation } from './math.js';

export const addLotteryTeams = (order, chance, lotteryTeamsCount) => {
    const lotteryOrder = [];

    for (let i = 0; i < lotteryTeamsCount; i++) {
        const totalChance = chance.reduce((sum, val) => sum + val, 0);
        const lotteryNumber = Math.floor(Math.random() * totalChance) + 1;

        let cumulative = 0;
        for (let j = 0; j < chance.length; j++) {
            cumulative += chance[j];
            if (lotteryNumber <= cumulative) {
                lotteryOrder.push(order[j]);
                order.splice(j, 1);
                chance.splice(j, 1);
                break;
            }
        }
    }

    return { lotteryOrder, remainingOrder: order };
};

export const addNonLotteryTeams = (lotteryOrder, remainingOrder) => {
    return [...lotteryOrder, ...remainingOrder];
};

export const applyChanges = (lotteryOrder, initialOrder, change) => {
    for (let i = 0; i < change.length; i++) {
        const teamName = initialOrder[change[i][0]];
        const resultIndex = lotteryOrder.indexOf(teamName);
        if (resultIndex < change[i][1] || resultIndex > change[i][2]) {
            lotteryOrder[resultIndex] = change[i][3];
        }
    }
};

export const getResultID = (lotteryOrder, initialOrder, lotteryTeamsCount) => {
    let resultID = 0;
    const totalTeams = initialOrder.length;
    for (let i = 0; i < lotteryTeamsCount - 1; i++) {
        const teamIndex = initialOrder.indexOf(lotteryOrder[i]);
        resultID += teamIndex * getPermutation(totalTeams - (i + 1), lotteryTeamsCount - (i + 1));
    }
    resultID += initialOrder.indexOf(lotteryOrder[lotteryTeamsCount - 1]);
    return resultID;
};