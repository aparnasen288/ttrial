// ===== GLOBAL STATE =====
let index = 0;

let stayClickIndex = -1;
let songAlreadyStarted = false;

let ytPlayer = null;

const introScreen = document.getElementById("introScreen");
const quizScreen  = document.getElementById("quizScreen");
const questionEl  = document.getElementById("questionText");
const gifEl       = document.getElementById("questionGif");


// ===== QUESTIONS =====
const questions = [
  { text:"number 1: i wish talking to you would pay me. easiest job in the world",
    gif:"https://media.tenor.com/upgefKqHX0IAAAAM/yapapa.gif", correct:"b" },

  { text:"number 2: i want you to be my nigger teen",
    gif:"https://media1.tenor.com/m/a467V24M0IUAAAAC/cat-bombastic-side-eye.gif", correct:"b" },

  { text:"number 3: you have eq no iq",
    gif:"https://media.tenor.com/mQgsdMciwSQAAAAj/kuromi-crying.gif", correct:"b" },

  { text:"number 4: BHAI AAP ACCOUNT SELL BHI KRTE HO?",
    gif:"https://media.tenor.com/v_STuC1r5G0AAAAM/umm-ok-ok.gif", correct:"b" },

  { text:"number 5: why does it say atsossa",
    gif:"https://media.tenor.com/MGzO5cuWwE0AAAAM/eww-ew.gif", correct:"b" },

  { text:"number 6: itne squishy ho tum punch krne ka mann krta h",
    gif:"https://media.tenor.com/uj50AqO_ZN8AAAAM/gummy-squish.gif", correct:"b" },

  { text:"number 7: NEED THAT TEENAGE SHIZ",
    gif:"https://media.tenor.com/hrux_hmWISUAAAAM/fbi-cute-police.gif", correct:"b" },

  { text:"number 8: kys",
    gif:"https://media.tenor.com/LAJkqz2D2KUAAAAM/triste-sad.gif", correct:"b" },

  { text:"number 9: feet🤤",
    gif:"https://media.tenor.com/Yrhyx2uywKMAAAAM/wiggle-bonk.gif", correct:"a" },

  { text:"number 10: im just a helpless lil prey uwu",
    gif:"https://media.tenor.com/AtTY9nx8bBEAAAAM/cat-kitten.gif", correct:"a" },

  { text:"number 11: seal = deal😼🤝",
    gif:"https://media1.tenor.com/m/yLufcre4n-MAAAAC/um-weird.gif", correct:"b" },

  { text:"number 12: what a king you married",
    gif:"https://media1.tenor.com/m/PaSdEckYQd0AAAAd/hd-smirk.gif", correct:"b" }
];


// ===== END BUTTON TEXTS =====
const stayTexts = [
  "Stay with Achu?",
  "achha?",
  "forever?",
  "pakka na?",
  "haha SIMP",
  "same ilysm",
  "♥️💗"
];


// ===== START QUIZ =====
function startQuiz() {
  index = 0;
  stayClickIndex = -1;
  songAlreadyStarted = false;

  const btn = document.getElementById("stayBtn");
  if (btn) btn.disabled = false;

  introScreen.style.display = "none";
  quizScreen.style.display = "flex";

  loadQuestion();
}


// ===== LOAD QUESTION / END SLIDE =====
function loadQuestion() {

  if (index >= questions.length) {

    questionEl.innerHTML =
      "so happy to have spent another year with you. you have always been lovely. hope 2026 gives u the bestest of what it has to offer. i will try my best do so as well 🥹 <br><br>i love you mostest. happy new year! 💗";

    gifEl.style.display = "none";

    document.querySelector(".buttons").innerHTML =
      '<button class="heart_btn" id="stayBtn" onclick="playSong()">❤️</button>';

    return;
  }

  questionEl.textContent = questions[index].text;
  gifEl.src = questions[index].gif;
  gifEl.style.display = "block";
}


// ===== POPUPS =====
function handleAnswer(choice) {
  const correct = questions[index].correct;

  if (choice === "a" && correct === "a") {
    document.getElementById("correctAtsuwu").style.display = "flex";
    return;
  }
  if (choice === "b" && correct === "b") {
    document.getElementById("correctChieffy").style.display = "flex";
    return;
  }
  if (correct === "a") {
    document.getElementById("wrongChieffy").style.display = "flex";
    return;
  }

  document.getElementById("wrongAtsuwu").style.display = "flex";
}

function closePopup() {
  ["correctAtsuwu","correctChieffy","wrongAtsuwu","wrongChieffy"]
    .forEach(id => document.getElementById(id).style.display="none");

  index++;
  loadQuestion();
}


// ===== COLOR HELPERS =====
const PINK_BG   = [255,230,239];
const TARGET_BG = [152,183,255];

function mix(a,b,t){
  return [
    Math.round(a[0]+(b[0]-a[0])*t),
    Math.round(a[1]+(b[1]-a[1])*t),
    Math.round(a[2]+(b[2]-a[2])*t)
  ];
}


// ===== MUSIC TIMING =====
const START_TIME = 50;
const FADE_START = 75;
const END_TIME   = 80;


// ===== MOON BUTTON (CREATE PLAYER ON CLICK) =====
function playSong() {

  const btn = document.getElementById("stayBtn");

  // button text cycle
  if (stayClickIndex < stayTexts.length - 1) {
    stayClickIndex++;
    btn.textContent = stayTexts[stayClickIndex];
  }
  if (stayClickIndex === stayTexts.length - 1)
    btn.disabled = true;

  // moon scene
  questionEl.innerHTML =
    "he looks just like a dream, the prettiest boy ive ever seen <3 ";

  gifEl.src =
    "https://64.media.tumblr.com/90f6cdcbc51c53fa4ca7294da96fc3f8/tumblr_pios19KpQC1ufq8wko1_1280.gif";

  gifEl.classList.add("moon_gif");
  gifEl.style.display = "block";

  // already playing → do not restart
  if (songAlreadyStarted) return;

  songAlreadyStarted = true;

  // ⭐ create player *inside this click* (required by Chrome autoplay rules)
  ytPlayer = new YT.Player("ytPlayer", {
    videoId: "am8doaXnxnI",
    playerVars: { autoplay:1, controls:0, modestbranding:1, start:START_TIME },
    events: { onReady: () => startSongPlayback() }
  });
}


// ===== FIRST-CLICK PLAYBACK =====
function startSongPlayback() {

  ytPlayer.seekTo(START_TIME);
  ytPlayer.setVolume(0);
  ytPlayer.playVideo();

  const targetVol = 50;
  const fadeMs = 3000;
  const start = performance.now();

  // smooth audio fade-in
  function fadeTick(now){
    const t = Math.min((now-start)/fadeMs,1);
    ytPlayer.setVolume(Math.round(targetVol*(t*t)));
    if(t<1) requestAnimationFrame(fadeTick);
  }
  requestAnimationFrame(fadeTick);

  // background fade
  function bgFade(){
    const pos = ytPlayer.getCurrentTime();
    const t = Math.min(Math.max((pos-START_TIME)/(END_TIME-START_TIME),0),1);
    const c = mix(PINK_BG,TARGET_BG,t);

    document.body.style.background =
      `linear-gradient(135deg,rgb(${c[0]},${c[1]},${c[2]}),rgb(${c[0]},${c[1]},${c[2]}))`;

    if (pos < END_TIME)
      requestAnimationFrame(bgFade);
  }
  requestAnimationFrame(bgFade);

  // fade-out near end
  const fadeHandle = setInterval(()=>{
    const t = ytPlayer.getCurrentTime();

    if(t>=FADE_START && t<=END_TIME){
      const p = (t-FADE_START)/(END_TIME-START_TIME);
      ytPlayer.setVolume(Math.max(0,targetVol*(1-p)));
    }

    if(t>=END_TIME){
      ytPlayer.pauseVideo();
      clearInterval(fadeHandle);
    }

  },150);
}
