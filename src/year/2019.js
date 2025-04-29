export const order = [
    "NYK",
    "CLE",
    "PHX",
    "CHI",
    "ATL",
    "WAS",
    "NOP",
    "MEM",
    "DAL",
    "MIN",
    "LAL",
    "CHA",
    "MIA",
    "SAC>PHI",
];

// Index of original pick owner
// Index of upper limit
// Index of lower limit
// Name of new pick owner if pick falls outside the limits

export const change = [
    [7, 0, 7, "MEM>BOS"],
    [8, 0, 3, "DAL>ATL"],
    [13, 0, 0, "SAC"],
    [13, 4, 12, "SAC>BOS"],
];

export const chance = [140, 140, 140, 125, 105, 90, 60, 60, 60, 30, 20, 10, 10, 0];
export const lotteryTeams = 4;