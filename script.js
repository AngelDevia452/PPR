/* --------------------------------------------------------------
   Configuration – edit these arrays / strings to customise the game
   -------------------------------------------------------------- */
const lawyerQuestions = [
    "What evidence do you want to present?",
    "Which witness will you call?",
    "Do you want to cross‑examine the prosecution's witness? (yes/no)",
    "Do you request a jury instruction on self‑defense? (yes/no)"
];

const lawyerSuccessMessage =
    "Your lawyer has finished preparing the case. The judge looks impressed – you have a good chance of winning!";

const soloJailMessage = "You end in jail.";

/* --------------------------------------------------------------
   State variables
   -------------------------------------------------------------- */
let currentQIndex = 0;

/* --------------------------------------------------------------
   UI helpers
   -------------------------------------------------------------- */
function $(id) { return document.getElementById(id); }

function show(el) { el.classList.remove('hidden'); }
function hide(el) { el.classList.add('hidden'); }

function resetGame() {
    hide($('questionBox'));
    hide($('soloBox'));
    hide($('output'));
    $('answerInput').value = '';
    $('soloInput').value = '';
    currentQIndex = 0;
}

/* --------------------------------------------------------------
   Event handlers
   -------------------------------------------------------------- */
// Hire‑lawyer path
$('hireBtn').addEventListener('click', () => {
    resetGame();
    show($('questionBox'));
    displayCurrentQuestion();
});

$('nextQuestionBtn').addEventListener('click', () => {
    // You could store the answer here if you need it later:
    const answer = $('answerInput').value.trim();

    currentQIndex++;
    if (currentQIndex < lawyerQuestions.length) {
        displayCurrentQuestion();
        $('answerInput').value = '';
    } else {
        hide($('questionBox'));
        $('output').textContent = lawyerSuccessMessage;
        show($('output'));
    }
});

function displayCurrentQuestion() {
    $('questionText').textContent = `${currentQIndex + 1}. ${lawyerQuestions[currentQIndex]}`;
}

// Solo‑self‑represent path
$('soloBtn').addEventListener('click', () => {
    resetGame();
    show($('soloBox'));
});

$('submitSoloBtn').addEventListener('click', () => {
    // Whatever the player types is ignored – we just show the fixed result
    const _statement = $('soloInput').value.trim(); // keep if you want to log it
    hide($('soloBox'));
    $('output').textContent = soloJailMessage;
    show($('output'));
});