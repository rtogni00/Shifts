"use strict";

function validateInput(checkIn, lunchBreak) {
    // Check if no input
    if (!checkIn || !lunchBreak) {
        alert("Please fill both fields");
        return false;
    }

    // Validate time format
    const myArr = checkIn.split(":");
    if (myArr.length !== 2) {
        alert("Use format HH:MM");
        return false;
    }

    // Convert to numbers
    const hours = Number(myArr[0]);
    const mins = Number(myArr[1]);
    const lunchMins = Number(lunchBreak);

    if (isNaN(hours) || isNaN(mins) || isNaN(lunchBreak)) {
        alert("Please enter valid numbers");
        return false;
    }

    // Validate ranges
    if (hours < 0 || hours > 23 || mins < 0 || mins > 59 || lunchMins < 0) {
        alert("Invalid time");
        return false;
    }

    return {hours, mins, lunchMins};
}

function calculateEndTime(hours, mins, lunchMins) {
    let endhours = hours + 8;
    let totMins = mins + lunchMins;

    // Handle new day
    if (endhours > 24) {
        endhours %= 24;
    }

    // Handle minutes
    while (totMins >= 60) {
        endhours += 1;
        totMins -= 60;
    }

    return {endhours, totMins};
}

function calculateShift() {
    const checkInTime = document.getElementById('check-in').value;
    const lunchBreak = document.getElementById('lunch-break').value;

    const validated = validateInput(checkInTime, lunchBreak);

    if (!validated) {
        return;
    }

    const {hours, mins, lunchMins} = validated;
    
    let {endhours, totMins} = calculateEndTime(hours, mins, lunchMins);

    // Format minutes
    if (totMins < 10) {
        totMins = totMins.toString();
        totMins = totMins.padStart(2, "0");
    }

    document.getElementById("check-out-display").textContent = `${endhours}:${totMins}`;

}

function setupPage() {
    const button = document.getElementById('calculate-shift');
    button.onclick = calculateShift; // function reference, not function call
}

document.addEventListener('DOMContentLoaded', setupPage);

