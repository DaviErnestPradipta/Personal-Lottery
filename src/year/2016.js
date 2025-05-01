export const order = [
    "PHI",
    "LAL",
    "BKN",
    "PHX",
    "MIN",
    "NOP",
    "DEN",
    "SAC",
    "TOR",
    "MIL",
    "ORL",
    "UTA",
    "WAS",
    "CHI",
];

export const chance = [250, 199, 156, 119, 88, 63, 43, 19, 19, 18, 8, 7, 6, 5];
export const actual = [0, 1, 2];
export const lotteryTeams = 3;

// Index of original pick owner
// Index of upper limit
// Index of lower limit
// Name of new pick owner if pick falls outside the limits

export const change = [
    [1, 0, 2, "LAL>PHI"],
    [7, 0, 9, "SAC>CHI"],
    [12, 0, 8, "WAS>PHX"],
    // PHI<>SAC, DEN<>TOR
];