# 🎮 Tic-Tac-Toe

**A classic game of Tic-Tac-Toe with multiple gameplay modes, dynamic game logic, and a clean, responsive user interface.**

### ✨ Features

#### Gameplay Modes

* **Player vs Player (PvP):** **Challenge a friend to a classic two-player match.**
* **Player vs Computer (PvC):** **Test your skills against a basic AI opponent.**

#### Player Customization

* **Players can** **enter their names** **on the start screen.**
* **In PvC mode, Player O's name is automatically set to**  **"Computer"** **.**
* **Player X must change their name** **from the default "Player X" to proceed, ensuring a personalized experience.**

#### Game Logic

* **The game** **tracks and displays the current player** **for each turn.**
* **It automatically determines and announces the**  **Winner** **, a**  **Draw** **, or a** **Loss** **(in PvC mode).**
* **Invalid moves are prevented** **, so players cannot click on filled or disabled squares.**
* **The** **computer's move is automatically played** **in PvC mode after the human player's turn.**

#### Game Controls

* **Restart Game:** **Instantly clear the board and start a new match with the same players.**
* **Next Match:** **Play another round, incrementing the match counter.**
* **Back to Menu:** **Return to the start screen to select a new game mode or change player names.**

#### Sound Effects

* **Click Sound:** **A satisfying "light-switch" sound plays on all button and square presses.**
* **Win Sound:** **A celebratory sound effect is triggered when a player wins.**
* **Lose Sound:** **A distinct sound plays if the human player is defeated by the computer.**
* **Draw Sound:** **A special sound effect signals a draw.**

#### User Interface

* **The application features a** **clean and responsive UI** **with conditional rendering for different views:**
  * **Start Screen**
  * **Name Entry Form**
  * **Game Board**
* **The** **match number** **is clearly displayed during the game.**
* **Turn status and result messages** **update dynamically to keep players informed.**

#### Utility Integration

* **The game uses a** **`<span class="selected">calculateWinner</span>`** **function to efficiently determine the outcome of each match.**
* **A** **`<span class="selected">makeComputerMove</span>`** **function provides the logic for the basic AI in PvC mode.**
