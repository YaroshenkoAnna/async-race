import { AuthService } from "../services/auth-service";
import { getRouter, Router } from "../router/router";
import { userStore } from "../stores/user-store";

export class LoginViewModel {
  private router: Router | null = null;
  constructor(private authService: AuthService) {}

  public async submit(login: string, password: string): Promise<string | null> {
    try {
      const user = await this.authService.login(login, password);
      if (user.isLogined && this.router) {
        userStore.setUser(user, password);
        this.router.navigate("/main");

        return null;
      }
      return "Error";
    } catch (err) {
      return typeof err === "string" ? err : "Server error";
    }
  }
  public setRouter(router: Router): void {
    this.router = router;
  }

  public logout() {
    const currentUser = userStore.currentUser$.value;
    if (currentUser && userStore.password) {
      this.authService
        .logout(currentUser.login, userStore.password)
        .then(() => {
          userStore.clear();
          getRouter().navigate("/login");
        })
        .catch(console.error);
    }
  }
}
