let totalSpent = 0;
let totalWon = 0;

function getTicket() {
    const selected = document.querySelector('input[name="ticket"]:checked');
    return selected ? selected.value : null;
}

function generateNumbers(count, max) {
    let nums = new Set();
    while (nums.size < count) {
        nums.add(Math.floor(Math.random() * max) + 1);
    }
    return Array.from(nums);
}

function play() {
    const ticket = getTicket();
    const picksInput = document.getElementById("picks").value.trim();
    const powerballEnabled = document.getElementById("powerballCheck").checked;
    const powerballPick = parseInt(document.getElementById("powerballPick").value);

    let cost = 0;
    let count = 0;
    let max = 0;

    if (ticket === "basic") {
        cost = 1; count = 3; max = 20;
    } else if (ticket === "standard") {
        cost = 3; count = 5; max = 50;
    } else if (ticket === "mega") {
        cost = 5; count = 6; max = 60;
    } else {
        alert("Select a ticket!");
        return;
    }

    let userPicks = picksInput.split(" ").map(Number);

    if (userPicks.length !== count) {
        alert(`Enter exactly ${count} numbers`);
        return;
    }

    let winning = generateNumbers(count, max);
    let powerballWin = Math.floor(Math.random() * 10) + 1;

    document.getElementById("winningNums").innerText = winning.join(" ");
    document.getElementById("winningPB").innerText = powerballWin;

    let matches = userPicks.filter(x => winning.includes(x)).length;
    let winnings = matches * 3;

    if (powerballEnabled && powerballPick === powerballWin) {
        winnings += 10;
    }

    totalSpent += cost + (powerballEnabled ? 2 : 0);
    totalWon += winnings;

    let profit = totalWon - totalSpent;

    document.getElementById("results").innerText =
        `Matches: ${matches} | Won: $${winnings}`;

    document.getElementById("spent").innerText = `$${totalSpent}`;
    document.getElementById("won").innerText = `$${totalWon}`;
    document.getElementById("profit").innerText = `$${profit}`;

    document.getElementById("profit").style.color =
        profit >= 0 ? "green" : "red";

    // RESET INPUTS
    document.getElementById("picks").value = "";
    document.getElementById("powerballPick").value = "";
    document.getElementById("powerballCheck").checked = false;
}