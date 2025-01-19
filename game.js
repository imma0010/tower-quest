document.addEventListener("DOMContentLoaded", () => {
  const difficulty = "Normal";
  const game = new TowerQuest(difficulty);

  const floorContainer = document.getElementById("floor-container");
  const currentFloorDisplay = document.getElementById("current-floor");
  const playerPointsDisplay = document.getElementById("player-points");

  const resetGameButton = document.getElementById("reset-game");
  const autoPlayButton = document.getElementById("auto-play");

  function renderGame() {
    floorContainer.innerHTML = "";
    game.boxesPerFloor.forEach((floor, index) => {
      const floorDiv = document.createElement("div");
      floorDiv.classList.add("floor");

      floor.forEach((boxContent, boxIndex) => {
        const boxDiv = document.createElement("div");
        boxDiv.classList.add("box");

        if (index < game.currentFloor || game.gameOver) {
          boxDiv.classList.add("revealed");
          boxDiv.textContent = boxContent === "gem" ? "💎" : "💣";
          boxDiv.classList.add(boxContent);
        } else {
          boxDiv.addEventListener("click", () => handleBoxClick(index, boxIndex));
        }

        floorDiv.appendChild(boxDiv);
      });

      floorContainer.appendChild(floorDiv);
    });

    currentFloorDisplay.textContent = game.currentFloor + 1;
    playerPointsDisplay.textContent = game.playerPoints;
  }

  function handleBoxClick(floorIndex, boxIndex) {
    if (floorIndex !== game.currentFloor || game.gameOver) return;
    game.selectBox(boxIndex);
    renderGame();
  }

  resetGameButton.addEventListener("click", () => {
    game.resetGame();
    renderGame();
  });

  autoPlayButton.addEventListener("click", () => {
    game.autoPlay();
    renderGame();
  });

  renderGame();
});
