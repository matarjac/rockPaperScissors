var rulesButton = document.getElementById('rules-btn');
var modalBox = document.getElementById('modal-box');
var closeButton = document.getElementById('close-img');
var mainContainer = document.getElementById('main-container');
var mainContainerPageTwo = document.getElementById('main-container-result-page');
var scissorsBtn = document.getElementById('scissors');
var paperBtn = document.getElementById('paper');
var rockBtn = document.getElementById('rock');
var buttonsArray = [scissorsBtn, paperBtn, rockBtn];
// Updating score board on refresh
var score = Number(localStorage.getItem('score'));
if (score == null) {
    score = 0;
    localStorage.setItem('score', "".concat(score));
}
document.getElementById('score-number-span').innerHTML = "".concat(score);
var psr;
(function (psr) {
    psr[psr["paper"] = 1] = "paper";
    psr[psr["scissors"] = 2] = "scissors";
    psr[psr["rock"] = 3] = "rock";
})(psr || (psr = {}));
var iconSrcs = {
    paper: "images/icon-paper.svg",
    scissors: "images/icon-scissors.svg",
    rock: "images/icon-rock.svg"
};
var colorValues = {
    paper: "radial-gradient(hsl(230, 89%, 62%), hsl(230, 89%, 65%))",
    scissors: "radial-gradient(hsl(39, 89%, 49%), hsl(40, 84%, 53%))",
    rock: "radial-gradient(hsl(349, 71%, 52%), hsl(349, 70%, 56%))"
};
// --- Assign eventListener for each button (scissors,paper,rock) --- // 
buttonsArray.forEach(function (obj) {
    obj.addEventListener('click', function () {
        var userBet = { selection: psr["".concat(obj.id)], colorValue: colorValues["".concat(obj.id)], iconSrc: iconSrcs["".concat(obj.id)] };
        var houseBet = randomChoice();
        // --- Changing main screen divs --- //
        mainContainer.style.display = "none";
        mainContainerPageTwo.style.display = "block";
        // --- styling user-Selection div according to corresponding style --- //
        document.getElementById('user-selection').style.background = userBet.colorValue;
        var currentIcon = document.getElementById('user-selection-icon');
        currentIcon.src = userBet.iconSrc;
        // --- styling house-Selection div according to corresponding style --- //
        document.getElementById('house-selection').style.background = houseBet.colorValue;
        var currentHouseIcon = document.getElementById('house-selection-icon');
        currentHouseIcon.src = houseBet.iconSrc;
        var result = whoWin(userBet.selection, houseBet.selection);
        // --- Revealing the house selection after 2secs timeout --- //
        setTimeout(function () {
            document.getElementById('house-selection').style.display = "block";
            if (result == 'tie') {
                document.getElementById('result-text-span').innerHTML = "IT'S A ".concat(result.toUpperCase(), "!");
            }
            else {
                document.getElementById('result-text-span').innerHTML = "YOU ".concat(result.toUpperCase());
            }
            document.getElementById('result-playagain').style.display = 'flex';
            document.getElementById('opponents-container').style.gap = '30%';
            document.getElementById('score-number-span').innerHTML = "".concat(updateScore(result));
        }, 2000);
    });
});
// ---- random house pick function ---- //
function randomChoice() {
    var randomNum = Math.random() * 3;
    var randomChoice;
    if (randomNum > 0 && randomNum < 1) {
        randomChoice = 'scissors';
    }
    else if (randomNum > 1 && randomNum < 2) {
        randomChoice = 'rock';
    }
    else {
        randomChoice = 'paper';
    }
    return { selection: psr[randomChoice], colorValue: colorValues[randomChoice], iconSrc: iconSrcs[randomChoice] };
}
// --- Check who won function --- //
function whoWin(userBet, houseBet) {
    var result;
    if (userBet == houseBet) {
        result = 'tie';
        return result;
    }
    else {
        switch (userBet) {
            case psr.paper:
                if (houseBet == psr.rock) {
                    result = 'win';
                }
                else {
                    result = 'lose';
                }
                ;
                break;
            case psr.rock:
                if (houseBet == psr.scissors) {
                    result = 'win';
                }
                else {
                    result = 'lose';
                }
                break;
            case psr.scissors:
                if (houseBet == psr.paper) {
                    result = 'win';
                }
                else {
                    result = 'lose';
                }
                break;
        }
        return result;
    }
}
function updateScore(result) {
    score = Number(localStorage.getItem('score'));
    switch (result) {
        case 'win':
            score += 1;
            break;
        case 'lose':
            score -= 1;
            break;
        case 'tie':
            score = score;
    }
    localStorage.setItem('score', "".concat(score));
    return score;
}
// --- Event listener for modal box ("rules" button clicked) --- //
if (rulesButton != null) {
    rulesButton.addEventListener('click', function () {
        if (modalBox != null) {
            modalBox.classList.add("not-hidden");
        }
        else {
            console.log('null');
        }
    });
}
// ----- Applying close modal event for the close img element ---- //
if (closeButton != null) {
    closeButton.addEventListener('click', function () {
        modalBox.classList.remove("not-hidden");
    });
}
// ----- play again Button ---- //
var playAgainBtn = document.getElementById('playagain-btn');
if (playAgainBtn != null) {
    playAgainBtn.addEventListener('click', function () {
        mainContainer.style.display = "flex";
        mainContainerPageTwo.style.display = "none";
        document.getElementById('house-selection').style.display = "none";
        document.getElementById('result-playagain').style.display = "none";
        document.getElementById('opponents-container').style.gap = '5%';
    });
}
