export class StorageManager {
  constructor(uniqueKey) {
    this.uniqueKey = uniqueKey;
    this.savedGameKey = this.uniqueKey + "_savedGame";
    this.leaderboardKey = this.uniqueKey + "_leaderboard";
  }

  saveGame(state) {
    localStorage.setItem(this.savedGameKey, JSON.stringify(state));
  }

  loadGame() {
    //обработать случай, когда в localStorage нет сохраненной игры
    return JSON.parse(localStorage.getItem(this.savedGameKey));
  }

  saveLeaderboard(leaderboard) {
    localStorage.setItem(this.leaderboardKey, JSON.stringify(leaderboard));
  }

  loadLeaderboard() {
    localStorage.getItem(this.leaderboardKey);
  }
}
