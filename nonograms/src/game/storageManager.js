export class StorageManager {
  constructor(uniqueKey) {
    this.uniqueKey = uniqueKey;
    this.savedGameKey = this.uniqueKey + "_savedGame";
    this.leaderboardKey = this.uniqueKey + "_leaderboard";
  }

  saveGame(gameState) {
    localStorage.setItem(this.storageKey, JSON.stringify(gameState));
  }

  loadGame() {
    const savedData = localStorage.getItem(this.storageKey);
    return savedData ? JSON.parse(savedData) : null;
  }

  saveLeaderboard(leaderboard) {
    localStorage.setItem(this.leaderboardKey, JSON.stringify(leaderboard));
  }

  loadLeaderboard() {
    localStorage.getItem(this.leaderboardKey);
  }
}
