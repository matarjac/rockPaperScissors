const rulesButton = document.getElementById('rules-btn') as HTMLButtonElement | null;
const modalBox = document.getElementById('modal-box') as HTMLDivElement | null;
const closeButton = document.getElementById('close-img') as HTMLImageElement | null;
const mainContainer = document.getElementById('main-container') as HTMLDivElement | null;
const mainContainerPageTwo = document.getElementById('main-container-result-page') as HTMLDivElement | null;
const scissorsBtn = document.getElementById('scissors') as HTMLButtonElement | null;
const paperBtn = document.getElementById('paper') as HTMLButtonElement | null;
const rockBtn = document.getElementById('rock') as HTMLButtonElement | null;
let buttonsArray: HTMLButtonElement[] = [scissorsBtn, paperBtn, rockBtn];

// Updating score board on refresh
let score: number | null = Number(localStorage.getItem('score'));
if (score == null){
    score = 0;
    localStorage.setItem('score', `${score}`);
}
document.getElementById('score-number-span').innerHTML=`${score}`;

enum psr {
    paper = 1,
    scissors,
    rock
}

const iconSrcs: object = {
    paper: "images/icon-paper.svg",
    scissors: "images/icon-scissors.svg",
    rock: "images/icon-rock.svg"
}

const colorValues: object = {
    paper: "radial-gradient(hsl(230, 89%, 62%), hsl(230, 89%, 65%))",
    scissors: "radial-gradient(hsl(39, 89%, 49%), hsl(40, 84%, 53%))",
    rock: "radial-gradient(hsl(349, 71%, 52%), hsl(349, 70%, 56%))"
}

interface Iselection{
    selection: psr,
    colorValue: string,
    iconSrc: string
}
// --- Assign eventListener for each button (scissors,paper,rock) --- // 

buttonsArray.forEach(obj => {
    obj.addEventListener('click', ()=>{
        const userBet: Iselection = {selection: psr[`${obj.id}`], colorValue: colorValues[`${obj.id}`], iconSrc: iconSrcs[`${obj.id}`]};
        const houseBet: Iselection = randomChoice();

        // --- Changing main screen divs --- //
        mainContainer.style.display = "none";
        mainContainerPageTwo.style.display = "block";

        // --- styling user-Selection div according to corresponding style --- //
        document.getElementById('user-selection').style.background = userBet.colorValue;
        let currentIcon = document.getElementById('user-selection-icon') as HTMLImageElement | null;
        currentIcon.src = userBet.iconSrc;

        // --- styling house-Selection div according to corresponding style --- //
        document.getElementById('house-selection').style.background = houseBet.colorValue;
        let currentHouseIcon = document.getElementById('house-selection-icon') as HTMLImageElement | null;
        currentHouseIcon.src = houseBet.iconSrc;

        let result:string = whoWin(userBet.selection, houseBet.selection);

        // --- Revealing the house selection after 2secs timeout --- //
        setTimeout(()=>{
            document.getElementById('house-selection').style.display="block";
            if(result == 'tie'){
                document.getElementById('result-text-span').innerHTML=`IT'S A ${result.toUpperCase()}!`;
            } else{
                document.getElementById('result-text-span').innerHTML=`YOU ${result.toUpperCase()}`;
            }
            document.getElementById('result-playagain').style.display = 'flex';
            document.getElementById('opponents-container').style.gap = '30%';
            document.getElementById('score-number-span').innerHTML=`${updateScore(result)}`;
        },2000);
    });
});

// ---- random house pick function ---- //
function randomChoice(): Iselection{
    let randomNum: number = Math.random()*3;
    let randomChoice: string;
    if (randomNum > 0 && randomNum < 1){
        randomChoice = 'scissors';
    } else if(randomNum > 1 && randomNum < 2){
        randomChoice = 'rock';
    } else{
        randomChoice = 'paper';
    }
    return {selection: psr[randomChoice], colorValue: colorValues[randomChoice], iconSrc: iconSrcs[randomChoice]};
}

// --- Check who won function --- //

function whoWin(userBet: psr, houseBet: psr): string{
    let result: string;

    if (userBet == houseBet){
        result = 'tie';
        return result;
    } else{
        switch (userBet){
            case psr.paper:
                if(houseBet==psr.rock){
                    result = 'win';
                } else{result = 'lose'};
                break;
            case psr.rock:
                if(houseBet==psr.scissors){
                    result = 'win';
                } else{
                    result = 'lose';
                }
                break;
            case psr.scissors:
                if(houseBet==psr.paper){
                    result = 'win';
                } else{
                    result = 'lose';
                }
                break;
        }
        return result;
    }
}

function updateScore(result:string): number{
    score = Number(localStorage.getItem('score'));
    switch(result){
        case 'win':
            score+=1;
            break;
        case 'lose':
            score-=1;
            break;
        case 'tie':
            score=score;
    }
    localStorage.setItem('score', `${score}`);
    return score;
}

// --- Event listener for modal box ("rules" button clicked) --- //

if (rulesButton != null){
    rulesButton.addEventListener('click', ()=>{
        if (modalBox != null){
            modalBox.classList.add("not-hidden");
        } else{
            console.log('null');
        }
    });
}

// ----- Applying close modal event for the close img element ---- //

if (closeButton != null){
    closeButton.addEventListener('click', ()=>{
        modalBox.classList.remove("not-hidden");
    });
}

// ----- play again Button ---- //
const playAgainBtn = document.getElementById('playagain-btn') as HTMLButtonElement | null;

if(playAgainBtn != null){
    playAgainBtn.addEventListener('click', ()=>{
        mainContainer.style.display = "flex";
        mainContainerPageTwo.style.display = "none";
        document.getElementById('house-selection').style.display="none";
        document.getElementById('result-playagain').style.display="none";
        document.getElementById('opponents-container').style.gap = '5%';
    });
}