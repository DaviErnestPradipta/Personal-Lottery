export const order = [
    "BOS",
    "PHX",
    "LAL",
    "PHI",
    "ORL",
    "MIN",
    "NYK",
    "SAC",
    "DAL",
    "NOP",
    "CHA",
    "DET",
    "DEN",
    "MIA",
];

export const chance = [250, 199, 156, 119, 88, 53, 53, 28, 17, 11, 8, 7, 6, 5];
export const actual = [0, 2, 7];
export const lotteryTeams = 3;

// Index of original pick owner
// Index of upper limit
// Index of lower limit
// Name of new pick owner if pick falls outside the limits

export const change = [
    [2, 0, 2, "LAL>PHI"],
    [7, 0, 9, "SAC>CHI"],
    [9, 0, 2, "NOP>SAC"],
    // PHI<>SAC
];