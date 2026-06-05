let selectedAvatar = "girl";
let childName = "";

let score = 0;
let correctAnswers = 0;
let answeredLevels = 0;

let lastActivityScore = 0;
let lastActivityMaxScore = 0;
let lastActivityCorrectAnswers = 0;
let lastActivityTotalTasks = 0;
let lastActivityWasPerfect = false;

let selectedActivity = "";
let currentActivity = "";
let currentDifficulty = "easy";
let pendingDifficulty = "easy";
let currentLevel = 0;
let selectedAnswers = [];
let currentInstruction = "";
let levelChecked = false;

let activityCorrectAnswers = 0;
let checkedLevels = {};

let audioContext = null;
let soundEnabled = true;
let animationsEnabled = true;

const activities = {
  letters: {
    easy: [
      {
        letter: "M",
        words: ["MAMA", "BAKA", "MLIN"],
        correct: ["MAMA", "MLIN"],
      },
      {
        letter: "S",
        words: ["ZRAK", "ŠUMA", "SAT"],
        correct: ["SAT"],
      },
      { letter: "P", words: ["PAS", "PERO", "REP"], correct: ["PAS", "PERO"] },
      {
        letter: "K",
        words: ["KLIN", "LIJEK", "KONJ"],
        correct: ["KLIN", "KONJ"],
      },
      {
        letter: "L",
        words: ["FRULA", "LOPTA", "LAV"],
        correct: ["LOPTA", "LAV"],
      },
    ],
    hard: [
      {
        letter: "B",
        words: ["BANANA", "BROD", "KAPA", "BUBA", "PRAVDA"],
        correct: ["BANANA", "BROD", "BUBA"],
      },
      {
        letter: "T",
        words: ["TATA", "TRAVA", "MAČKA", "TORBA", "RIBA"],
        correct: ["TATA", "TRAVA", "TORBA"],
      },
      {
        letter: "A",
        words: ["AUTO", "ANANAS", "PAS", "AVION", "MORE"],
        correct: ["AUTO", "ANANAS", "AVION"],
      },
      {
        letter: "Z",
        words: ["ZEC", "ZIMA", "KUĆA", "VLAK", "SRNA"],
        correct: ["ZEC", "ZIMA"],
      },
      {
        letter: "R",
        words: ["RIBA", "RAK", "MORE", "SIR", "SAT"],
        correct: ["RIBA", "RAK"],
      },
    ],
  },

  memory: {
    easy: [
      { sequence: ["V", "U", "K"], options: ["K", "V", "U"] },
      { sequence: ["P", "A", "S"], options: ["P", "S", "A"] },
      { sequence: ["L", "A", "V"], options: ["L", "V", "A"] },
      { sequence: ["S", "O", "K"], options: ["K", "O", "S"] },
      { sequence: ["Z", "E", "C"], options: ["Z", "C", "E"] },
    ],
    hard: [
      { sequence: ["S", "I", "R"], options: ["B", "R", "I", "S", "O"] },
      { sequence: ["M", "I", "Š"], options: ["Š", "M", "I", "O", "R"] },
      { sequence: ["Ć", "U", "K"], options: ["Ć", "K", "U", "A", "M"] },
      { sequence: ["L", "A", "V"], options: ["V", "L", "A", "S", "T"] },
      { sequence: ["Z", "E", "C"], options: ["C", "Z", "E", "L", "A"] },
    ],
  },

  animals: {
    easy: [
      {
        items: [
          { img: "assets/animals/pas.jpg", t: "PAS", animal: true },
          { img: "assets/objects/auto.jpg", t: "AUTO", animal: false },
          { img: "assets/animals/macka.jpg", t: "MAČKA", animal: true },
        ],
      },
      {
        items: [
          { img: "assets/animals/riba.jpg", t: "RIBA", animal: true },
          { img: "assets/objects/lopta.png", t: "LOPTA", animal: false },
          { img: "assets/animals/zec.jpg", t: "ZEC", animal: true },
        ],
      },
      {
        items: [
          { img: "assets/animals/lav.png", t: "LAV", animal: true },
          { img: "assets/objects/knjiga.jpg", t: "KNJIGA", animal: false },
          { img: "assets/animals/mis.jpg", t: "MIŠ", animal: true },
        ],
      },
      {
        items: [
          { img: "assets/animals/konj.jpg", t: "KONJ", animal: true },
          { img: "assets/objects/olovka.png", t: "OLOVKA", animal: false },
          { img: "assets/animals/zaba.jpg", t: "ŽABA", animal: true },
        ],
      },
      {
        items: [
          { img: "assets/animals/ptica.jpg", t: "PTICA", animal: true },
          { img: "assets/objects/sok.png", t: "SOK", animal: false },
          { img: "assets/animals/krava.jpg", t: "KRAVA", animal: true },
        ],
      },
    ],
    hard: [
      {
        items: [
          { img: "assets/animals/pas.jpg", t: "PAS", animal: true },
          { img: "assets/objects/auto.jpg", t: "AUTO", animal: false },
          { img: "assets/animals/macka.jpg", t: "MAČKA", animal: true },
          { img: "assets/objects/torba.png", t: "TORBA", animal: false },
        ],
      },
      {
        items: [
          { img: "assets/animals/riba.jpg", t: "RIBA", animal: true },
          { img: "assets/objects/lopta.png", t: "LOPTA", animal: false },
          { img: "assets/animals/zec.jpg", t: "ZEC", animal: true },
          { img: "assets/objects/knjiga.jpg", t: "KNJIGA", animal: false },
        ],
      },
      {
        items: [
          { img: "assets/animals/lav.png", t: "LAV", animal: true },
          { img: "assets/objects/knjiga.jpg", t: "KNJIGA", animal: false },
          { img: "assets/animals/mis.jpg", t: "MIŠ", animal: true },
          { img: "assets/objects/olovka.png", t: "OLOVKA", animal: false },
        ],
      },
      {
        items: [
          { img: "assets/animals/zaba.jpg", t: "ŽABA", animal: true },
          { img: "assets/objects/kuca.png", t: "KUĆA", animal: false },
          { img: "assets/animals/konj.jpg", t: "KONJ", animal: true },
          { img: "assets/objects/torba.png", t: "TORBA", animal: false },
        ],
      },
      {
        items: [
          { img: "assets/animals/ptica.jpg", t: "PTICA", animal: true },
          { img: "assets/objects/sok.png", t: "SOK", animal: false },
          { img: "assets/animals/krava.jpg", t: "KRAVA", animal: true },
          { img: "assets/objects/auto.jpg", t: "AUTO", animal: false },
        ],
      },
    ],
  },

  word: {
    easy: [
      { word: "PAS", image: "assets/animals/pas.jpg" },
      { word: "LAV", image: "assets/animals/lav.png" },
      { word: "SOK", image: "assets/objects/sok.png" },
      { word: "ZEC", image: "assets/animals/zec.jpg" },
      { word: "MIŠ", image: "assets/animals/mis.jpg" },
    ],
    hard: [
      { word: "MAČKA", image: "assets/animals/macka.jpg" },
      { word: "RIBA", image: "assets/animals/riba.jpg" },
      { word: "PTICA", image: "assets/animals/ptica.jpg" },
      { word: "KUĆA", image: "assets/objects/kuca.png" },
      { word: "KONJ", image: "assets/animals/konj.jpg" },
    ],
  },
};

function getChildEnding(maleText, femaleText) {
  return selectedAvatar === "boy" ? maleText : femaleText;
}

function getAudioContext() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;

  if (!audioContext) {
    audioContext = new AudioContext();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  return audioContext;
}

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(function (screen) {
    screen.classList.remove("active");
  });

  document.getElementById(screenId).classList.add("active");
}

function goHome() {
  showScreen("homeScreen");
}

function chooseAvatar(type) {
  selectedAvatar = type;

  document.getElementById("boyAvatarBtn").classList.remove("selected");
  document.getElementById("girlAvatarBtn").classList.remove("selected");

  if (type === "boy") {
    document.getElementById("boyAvatarBtn").classList.add("selected");
  } else {
    document.getElementById("girlAvatarBtn").classList.add("selected");
  }

  renderAvatars("neutral");
}

function renderAvatars(mood = "neutral") {
  const avatarMap = {
    boy: {
      neutral: "assets/avatars/avatar-boy-neutral.png",
      happy: "assets/avatars/avatar-boy-happy.png",
      thinking: "assets/avatars/avatar-boy-thinking.png",
    },
    girl: {
      neutral: "assets/avatars/avatar-girl-neutral.png",
      happy: "assets/avatars/avatar-girl-happy.png",
      thinking: "assets/avatars/avatar-girl-thinking.png",
    },
  };

  const imagePath =
    avatarMap[selectedAvatar][mood] || avatarMap[selectedAvatar].neutral;

  const avatarHTML = `<img src="${imagePath}" alt="Avatar vodič">`;

  document.getElementById("avatarDisplay").innerHTML = avatarHTML;
  document.getElementById("gameAvatar").innerHTML = avatarHTML;
}

function showMainMenu() {
  const nameInput = document.getElementById("childName");

  if (nameInput && nameInput.value.trim() !== "") {
    childName = nameInput.value.trim();
  }

  showScreen("menuScreen");

  if (childName !== "") {
    updateBubble("Bok, " + childName + "! Odaberi što želiš raditi.");
  } else {
    updateBubble("Odaberi aktivnost, savjete ili rezultate.");
  }

  renderAvatars("neutral");
}

function showActivities() {
  showScreen("activitiesScreen");
}

function showParents() {
  showScreen("parentsScreen");
}

function showSettings() {
  showScreen("settingsScreen");
}

function showUserGuide() {
  showScreen("userGuideScreen");
}

function openDifficulty(activityName) {
  selectedActivity = activityName;
  document.getElementById("difficultyTitle").textContent = "Odaberi razinu";
  showScreen("difficultyScreen");
}

function startActivity(difficulty) {
  pendingDifficulty = difficulty;
  showScreen("howToPlayScreen");
}

function beginSelectedActivity() {
  currentActivity = selectedActivity;
  currentDifficulty = pendingDifficulty;
  currentLevel = 0;

  selectedAnswers = [];
  levelChecked = false;

  activityCorrectAnswers = 0;
  checkedLevels = {};

  showScreen("gameScreen");
  loadLevel();
}

function showResults() {
  showScreen("resultsScreen");

  document.getElementById("finalStars").textContent = calculateStars();

  if (answeredLevels === 0) {
    document.getElementById("finalScoreText").innerHTML =
      "Još nema završenih aktivnosti.";

    document.getElementById("resultMessage").textContent =
      "Odaberi aktivnost i kreni.";

    return;
  }

  document.getElementById("finalScoreText").innerHTML = `
    <strong>Rezultat zadnje aktivnosti:</strong> ${lastActivityScore} / ${lastActivityMaxScore} bodova<br>
    <strong>Ukupni rezultat:</strong> ${score} / ${answeredLevels * 10} bodova
  `;

  if (lastActivityWasPerfect) {
    document.getElementById("resultMessage").textContent = getChildEnding(
      "Odlično! Sve zadatke u ovoj aktivnosti riješio si točno.",
      "Odlično! Sve zadatke u ovoj aktivnosti riješila si točno.",
    );
  } else if (lastActivityCorrectAnswers >= lastActivityTotalTasks * 0.8) {
    document.getElementById("resultMessage").textContent =
      "Bravo! Imaš jako dobar rezultat u ovoj aktivnosti.";
  } else if (lastActivityCorrectAnswers >= lastActivityTotalTasks * 0.5) {
    document.getElementById("resultMessage").textContent =
      "Dobar posao! Još malo vježbe i bit će još bolje.";
  } else {
    document.getElementById("resultMessage").textContent =
      "Dobar početak! Svaki pokušaj je važan.";
  }
}

function updateBubble(text) {
  document.getElementById("avatarBubble").textContent = text;
  document.getElementById("gameBubble").textContent = text;
}

function loadLevel() {
  renderAvatars("neutral");

  selectedAnswers = [];
  levelChecked = false;

  document.getElementById("feedback").textContent = "";
  document.getElementById("feedback").className = "feedback";

  const levels = activities[currentActivity][currentDifficulty];

  document.getElementById("levelInfo").textContent =
    "Zadatak " + (currentLevel + 1) + "/" + levels.length;

  updateProgressDots();

  if (currentActivity === "letters") loadLettersGame();
  if (currentActivity === "memory") loadMemoryGame();
  if (currentActivity === "animals") loadAnimalsGame();
  if (currentActivity === "word") loadWordGame();
}

function updateProgressDots() {
  const levels = activities[currentActivity][currentDifficulty];
  let dots = "";

  for (let i = 0; i < levels.length; i++) {
    dots += i <= currentLevel ? "● " : "○ ";
  }

  document.getElementById("progressDots").textContent = dots.trim();
}

function loadLettersGame() {
  const level = activities.letters[currentDifficulty][currentLevel];

  document.getElementById("gameTitle").textContent = "Riječi na isto slovo";
  currentInstruction =
    "Klikni sve riječi koje počinju slovom " + level.letter + ".";

  document.getElementById("instruction").textContent = currentInstruction;
  document.getElementById("visualHint").textContent = level.letter;

  const gameArea = document.getElementById("gameArea");
  gameArea.innerHTML = "";

  level.words.forEach(function (word) {
    const card = document.createElement("button");
    card.className = "option-card";
    card.textContent = word;

    card.onclick = function () {
      if (levelChecked) return;

      card.classList.toggle("selected");
      toggleSelectedAnswer(word);
    };

    gameArea.appendChild(card);
  });

  updateBubble("Pronađi riječi koje počinju istim slovom.");
}

function loadMemoryGame() {
  const level = activities.memory[currentDifficulty][currentLevel];

  document.getElementById("gameTitle").textContent = "Zapamti 3 slova";
  currentInstruction = "Zapamti tri slova, zatim ih klikni istim redoslijedom.";

  document.getElementById("instruction").textContent = currentInstruction;
  document.getElementById("visualHint").textContent = level.sequence.join("  ");

  const gameArea = document.getElementById("gameArea");
  gameArea.innerHTML = "";

  setTimeout(function () {
    if (currentActivity === "memory" && !levelChecked) {
      document.getElementById("visualHint").textContent = "? ? ?";
    }
  }, 2500);

  level.options.forEach(function (letter) {
    const card = document.createElement("button");
    card.className = "option-card letter-option";
    card.textContent = letter;

    card.onclick = function () {
      if (levelChecked || selectedAnswers.length >= 3) return;

      selectedAnswers.push(letter);
      card.classList.add("selected");
      card.disabled = true;
    };

    gameArea.appendChild(card);
  });

  updateBubble("Prvo pogledaj, zatim ponovi redoslijed.");
}

function loadAnimalsGame() {
  const level = activities.animals[currentDifficulty][currentLevel];

  document.getElementById("gameTitle").textContent = "Klikni samo životinje";
  currentInstruction = "Klikni samo životinje. Predmete ostavi neoznačene.";

  document.getElementById("instruction").textContent = currentInstruction;
  document.getElementById("visualHint").textContent = "🐾 Životinje";

  const gameArea = document.getElementById("gameArea");
  gameArea.innerHTML = "";

  level.items.forEach(function (item) {
    const card = document.createElement("button");
    card.className = "option-card image-option";

    card.innerHTML = `
      <img src="${item.img}" alt="${item.t}">
      <strong>${item.t}</strong>
    `;

    card.onclick = function () {
      if (levelChecked) return;

      card.classList.toggle("selected");
      toggleSelectedAnswer(item.t);
    };

    gameArea.appendChild(card);
  });

  updateBubble("Dobro pogledaj. Klikni samo životinje.");
}

function loadWordGame() {
  const level = activities.word[currentDifficulty][currentLevel];

  document.getElementById("gameTitle").textContent = "Složi riječ";
  currentInstruction = "Pogledaj sliku. Povuci ili klikni slova i složi riječ.";

  document.getElementById("instruction").textContent = currentInstruction;

  document.getElementById("visualHint").innerHTML = `
    <img class="word-image" src="${level.image}" alt="Slika pojma">
  `;

  const gameArea = document.getElementById("gameArea");
  gameArea.innerHTML = "";

  const dropSection = document.createElement("div");
  dropSection.className = "word-drop-section";

  for (let i = 0; i < level.word.length; i++) {
    const zone = document.createElement("div");
    zone.className = "drop-zone";
    zone.dataset.index = i;

    zone.ondragover = function (event) {
      event.preventDefault();
    };

    zone.ondrop = function (event) {
      event.preventDefault();

      if (levelChecked || zone.textContent !== "") return;

      const droppedLetter = event.dataTransfer.getData("text");
      const tileId = event.dataTransfer.getData("tileId");

      zone.textContent = droppedLetter;
      selectedAnswers[Number(zone.dataset.index)] = droppedLetter;

      const tile = document.getElementById(tileId);
      if (tile) disableTile(tile);
    };

    dropSection.appendChild(zone);
  }

  const letterSection = document.createElement("div");
  letterSection.className = "word-letters-section";

  shuffleArray(level.word.split("")).forEach(function (letter, index) {
    const tile = document.createElement("button");

    tile.id = "tile-" + currentLevel + "-" + index;
    tile.className = "letter-tile";
    tile.textContent = letter;
    tile.draggable = true;

    tile.ondragstart = function (event) {
      if (levelChecked) return;

      event.dataTransfer.setData("text", letter);
      event.dataTransfer.setData("tileId", tile.id);
    };

    tile.onclick = function () {
      if (levelChecked) return;

      placeLetter(letter, tile, dropSection);
    };

    letterSection.appendChild(tile);
  });

  gameArea.appendChild(dropSection);
  gameArea.appendChild(letterSection);

  updateBubble("Prvo pogledaj sliku, zatim složi riječ.");
}

function placeLetter(letter, tile, dropSection) {
  const zones = dropSection.querySelectorAll(".drop-zone");

  for (let i = 0; i < zones.length; i++) {
    if (zones[i].textContent === "") {
      zones[i].textContent = letter;
      selectedAnswers[i] = letter;
      disableTile(tile);
      break;
    }
  }
}

function disableTile(tile) {
  tile.style.opacity = "0.35";
  tile.style.pointerEvents = "none";
  tile.draggable = false;
}

function toggleSelectedAnswer(value) {
  if (selectedAnswers.includes(value)) {
    selectedAnswers = selectedAnswers.filter(function (answer) {
      return answer !== value;
    });
  } else {
    selectedAnswers.push(value);
  }
}

function clearCurrentAnswer() {
  if (levelChecked) {
    document.getElementById("feedback").textContent =
      "Zadatak je već provjeren. Klikni Sljedeće.";
    document.getElementById("feedback").className = "feedback bad";
    return;
  }

  selectedAnswers = [];
  loadLevel();
}

function checkAnswer() {
  if (checkedLevels[currentLevel]) return;

  if (currentActivity === "letters") checkLettersAnswer();
  if (currentActivity === "memory") checkMemoryAnswer();
  if (currentActivity === "animals") checkAnimalsAnswer();
  if (currentActivity === "word") checkWordAnswer();

  checkedLevels[currentLevel] = true;
}

function checkLettersAnswer() {
  const level = activities.letters[currentDifficulty][currentLevel];

  const correct = [...level.correct].sort().join(",");
  const selected = [...selectedAnswers].sort().join(",");

  if (correct === selected) {
    goodAnswer(
      getChildEnding("Pronašao si sve riječi.", "Pronašla si sve riječi."),
    );
  } else {
    badAnswer("Pogledaj početno slovo i pokušaj opet.");
  }
}

function checkMemoryAnswer() {
  const level = activities.memory[currentDifficulty][currentLevel];

  const correct = level.sequence.join("");
  const selected = selectedAnswers.join("");

  if (correct === selected) {
    goodAnswer("Odlično pamćenje!");
  } else {
    badAnswer("Redoslijed nije isti. Pokušaj opet.");
  }
}

function checkAnimalsAnswer() {
  const level = activities.animals[currentDifficulty][currentLevel];

  const correct = level.items
    .filter(function (item) {
      return item.animal;
    })
    .map(function (item) {
      return item.t;
    })
    .sort()
    .join(",");

  const selected = [...selectedAnswers].sort().join(",");

  if (correct === selected) {
    goodAnswer(
      getChildEnding(
        "Odabrao si samo životinje.",
        "Odabrala si samo životinje.",
      ),
    );
  } else {
    badAnswer("Jedno od odabranog nije životinja. Pokušaj opet.");
  }
}

function checkWordAnswer() {
  const level = activities.word[currentDifficulty][currentLevel];
  const selectedWord = selectedAnswers.join("");

  if (selectedWord === level.word) {
    goodAnswer(
      getChildEnding("Točno si složio riječ.", "Točno si složila riječ."),
    );
  } else {
    badAnswer("Slova nisu posložena dobrim redoslijedom. Pokušaj opet.");
  }
}

function goodAnswer(message) {
  levelChecked = true;
  activityCorrectAnswers++;

  document.getElementById("feedback").textContent = "Točno! " + message;
  document.getElementById("feedback").className = "feedback good";

  renderAvatars("happy");

  const praise = getChildEnding(
    "Bravo, super si to riješio!",
    "Bravo, super si to riješila!",
  );

  updateBubble(praise);
  speak(praise);
  playSimpleSound(true);
}

function badAnswer(message) {
  levelChecked = true;

  document.getElementById("feedback").textContent = "Nije točno. " + message;
  document.getElementById("feedback").className = "feedback bad";

  renderAvatars("thinking");

  updateBubble("Polako. Možeš pokušati ponovno.");
  speak("Pokušaj ponovno. Možeš ti to!");
  playSimpleSound(false);
}

function nextLevel() {
  if (!checkedLevels[currentLevel]) {
    checkedLevels[currentLevel] = true;
  }

  const levels = activities[currentActivity][currentDifficulty];

  if (currentLevel < levels.length - 1) {
    currentLevel++;
    loadLevel();
  } else {
    finishActivity();
  }
}

function finishActivity() {
  const levels = activities[currentActivity][currentDifficulty];

  lastActivityCorrectAnswers = activityCorrectAnswers;
  lastActivityTotalTasks = levels.length;
  lastActivityScore = lastActivityCorrectAnswers * 10;
  lastActivityMaxScore = lastActivityTotalTasks * 10;
  lastActivityWasPerfect =
    lastActivityCorrectAnswers === lastActivityTotalTasks;

  score += lastActivityScore;
  correctAnswers += lastActivityCorrectAnswers;
  answeredLevels += lastActivityTotalTasks;

  updateScore();

  if (lastActivityWasPerfect) {
    playTrumpetSound();
  }

  setTimeout(
    function () {
      showResults();
    },
    lastActivityWasPerfect ? 900 : 0,
  );
}

function updateScore() {
  document.getElementById("score").textContent = score;
  document.getElementById("stars").textContent = calculateStars();
}

function calculateStars() {
  if (answeredLevels === 0) return "☆☆☆☆☆";

  const percentage = correctAnswers / answeredLevels;

  if (percentage === 1) return "★★★★★";
  if (percentage >= 0.8) return "★★★★☆";
  if (percentage >= 0.6) return "★★★☆☆";
  if (percentage >= 0.4) return "★★☆☆☆";
  return "★☆☆☆☆";
}

function speakInstruction() {
  speak(currentInstruction);
}

function speak(text) {
  if (!soundEnabled) return;
  if (!window.speechSynthesis) return;

  window.speechSynthesis.cancel();

  const message = new SpeechSynthesisUtterance(text);
  message.lang = "hr-HR";
  message.rate = 0.88;
  message.pitch = 1;

  window.speechSynthesis.speak(message);
}

function playSimpleSound(isCorrect) {
  if (!soundEnabled) return;

  const context = getAudioContext();

  if (!context) return;

  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.frequency.value = isCorrect ? 720 : 240;
  oscillator.type = "sine";

  gain.gain.setValueAtTime(0.08, context.currentTime);
  gain.gain.linearRampToValueAtTime(0, context.currentTime + 0.16);

  oscillator.start();
  oscillator.stop(context.currentTime + 0.16);
}

function playTrumpetSound() {
  if (!soundEnabled) return;

  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }

  const context = getAudioContext();

  if (!context) return;

  const notes = [
    { frequency: 523.25, duration: 0.18 },
    { frequency: 659.25, duration: 0.18 },
    { frequency: 783.99, duration: 0.18 },
    { frequency: 1046.5, duration: 0.42 },
  ];

  notes.forEach(function (note, index) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.type = "square";
    oscillator.frequency.value = note.frequency;

    const startTime = context.currentTime + index * 0.22;

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.16, startTime + 0.03);
    gain.gain.linearRampToValueAtTime(0, startTime + note.duration);

    oscillator.start(startTime);
    oscillator.stop(startTime + note.duration);
  });
}

// U postavkama zamijeni stare toggle funkcije ovima:

function setLargeText() {
  document.body.classList.add("large-text");
  updateBubble("Veći font je uključen.");
}

function setSmallText() {
  document.body.classList.remove("large-text");
  updateBubble("Manji font je uključen.");
}

function setLightBackground() {
  document.body.classList.remove("dark-soft");
  updateBubble("Svijetla pozadina je uključena.");
}

function setDarkBackground() {
  document.body.classList.add("dark-soft");
  updateBubble("Tamnija pozadina je uključena.");
}

function enableSound() {
  soundEnabled = true;
  updateBubble("Zvuk je uključen.");
}

function disableSound() {
  soundEnabled = false;

  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }

  updateBubble("Zvuk je isključen.");
}

function enableAnimations() {
  animationsEnabled = true;
  document.body.classList.remove("no-animations");
  updateBubble("Animacije su uključene.");
}

function disableAnimations() {
  animationsEnabled = false;
  document.body.classList.add("no-animations");
  updateBubble("Animacije su isključene.");
}

function showParentAdvice(type) {
  showScreen("adviceScreen");

  const title = document.getElementById("adviceTitle");
  const content = document.getElementById("adviceContent");

  if (type === "dyslexia") {
    title.textContent = "Savjeti za roditelje djece s disleksijom";
    content.innerHTML = `
      <ul>
        <li>Čitajte kratko, ali redovito.</li>
        <li>Dajte jednu uputu odjednom.</li>
        <li>Koristite audio podršku kad god je moguće.</li>
        <li>Pohvalite trud, a ne samo rezultat.</li>
        <li>Koristite veći font, dobar kontrast i dovoljno razmaka.</li>
        <li>Djetetu dajte više vremena za čitanje i pisanje.</li>
        <li>Nemojte tražiti da dijete čita naglas ako mu je neugodno.</li>
        <li>Tekst podijelite na manje cjeline i označite važne riječi.</li>
        <li>Koristite slike, boje i simbole kao pomoć pri razumijevanju.</li>
        <li>Kod domaće zadaće napravite kratke pauze između zadataka.</li>
      </ul>

      <div class="video-box">
        <h2>Kratki video o disleksiji</h2>
        <p>Video je dodatna podrška roditeljima.</p>
        <div class="video-wrapper">
          <iframe
            src="https://www.youtube.com/embed/zqnCEK1M2oY"
            title="Video o disleksiji"
            allowfullscreen>
          </iframe>
        </div>
      </div>

      <div class="links-section">
        <h3>Korisni linkovi</h3>

        <a class="resource-card" href="https://hud.hr/simptomi-disleksije-u-skolske-djece/" target="_blank">
          <span class="resource-icon">📚</span>
          <div>
            <strong>Simptomi disleksije u školske djece</strong>
            <p>Stranica objašnjava najčešće znakove disleksije kod djece školske dobi i može pomoći roditeljima da lakše prepoznaju teškoće.</p>
          </div>
        </a>

        <a class="resource-card" href="https://hud.hr/disleksija-i-citanje/" target="_blank">
          <span class="resource-icon">📚</span>
          <div>
            <strong>Disleksija i čitanje</strong>
            <p>Tekst donosi korisne informacije o tome kako disleksija utječe na čitanje i kako se djetetu može pružiti podrška.</p>
          </div>
        </a>

        <a class="resource-card" href="https://logotherapia.hr/specificne-teskoce-ucenja-citanja-pisanja-i-racunanja/" target="_blank">
          <span class="resource-icon">🔗</span>
          <div>
            <strong>Specifične teškoće učenja</strong>
            <p>Članak objašnjava teškoće čitanja, pisanja i računanja te daje širi kontekst za razumijevanje djetetovih potreba.</p>
          </div>
        </a>
      </div>
    `;
  }

  if (type === "adhd") {
    title.textContent = "Savjeti za roditelje djece s ADHD-om";
    content.innerHTML = `
      <ul>
        <li>Zadatke podijelite na male korake.</li>
        <li>Koristite jasnu rutinu i kratke pauze.</li>
        <li>Smanjite distrakcije u prostoru.</li>
        <li>Pohvalite konkretno ponašanje.</li>
        <li>Koristite vizualne podsjetnike i kratke upute.</li>
        <li>Prije učenja dogovorite kratko pravilo: jedan zadatak, jedna pauza.</li>
        <li>Koristite timer kako bi dijete znalo koliko zadatak traje.</li>
        <li>Dopustite kratko kretanje između aktivnosti.</li>
        <li>Upute izgovorite mirno, kratko i provjerite je li ih dijete razumjelo.</li>
        <li>Nagradite trud odmah nakon zadatka, npr. pohvalom, zvjezdicom ili kratkom igrom.</li>
      </ul>

      <div class="video-box">
        <h2>Video: ADHD kod djece</h2>
        <p>Video je dodatna podrška roditeljima.</p>
        <div class="video-wrapper">
          <iframe
            src="https://www.youtube.com/embed/btS76hCZOVw"
            title="ADHD kod djece"
            allowfullscreen>
          </iframe>
        </div>
      </div>

      <div class="links-section">
        <h3>Korisni linkovi</h3>

        <a class="resource-card" href="https://pcsg.hr/adhd/adhd-u-djecjoj-dobi/" target="_blank">
          <span class="resource-icon">📚</span>
          <div>
            <strong>ADHD u dječjoj dobi</strong>
            <p>Stranica donosi pregled osnovnih informacija o ADHD-u kod djece, simptomima i mogućim oblicima podrške.</p>
          </div>
        </a>

        <a class="resource-card" href="https://budenje.hr/igre-koje-povecavaju-koncentraciju-kod-djece-s-adhd-om/" target="_blank">
          <span class="resource-icon">📚</span>
          <div>
            <strong>Igre koje povećavaju koncentraciju</strong>
            <p>Članak nudi ideje za igre i aktivnosti koje roditelji mogu koristiti za vježbanje pažnje i koncentracije.</p>
          </div>
        </a>

        <a class="resource-card" href="https://www.skolskiportal.hr/sadrzaj/savjeti-strucnjaka/kako-djeci-koja-pate-od-adhd-a-pomoci-pri-pisanju-domace-zadace/" target="_blank">
          <span class="resource-icon">🔗</span>
          <div>
            <strong>Pomoć pri pisanju domaće zadaće</strong>
            <p>Tekst sadrži praktične savjete kako organizirati domaću zadaću i olakšati djetetu izvršavanje školskih obveza.</p>
          </div>
        </a>
      </div>
    `;
  }
}

function resetGame() {
  score = 0;
  correctAnswers = 0;
  answeredLevels = 0;

  lastActivityScore = 0;
  lastActivityMaxScore = 0;
  lastActivityCorrectAnswers = 0;
  lastActivityTotalTasks = 0;
  lastActivityWasPerfect = false;

  currentLevel = 0;
  selectedAnswers = [];
  levelChecked = false;

  activityCorrectAnswers = 0;
  checkedLevels = {};

  updateScore();
  updateBubble("Rezultat je obrisan. Možemo krenuti ispočetka.");
  showMainMenu();
}

function shuffleArray(array) {
  return array
    .map(function (value) {
      return { value: value, sort: Math.random() };
    })
    .sort(function (a, b) {
      return a.sort - b.sort;
    })
    .map(function (item) {
      return item.value;
    });
}

updateScore();
chooseAvatar("girl");
