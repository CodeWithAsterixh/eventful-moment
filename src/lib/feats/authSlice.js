import { defineStore } from "pinia";
import { users } from "../helpers";

const useAuth = defineStore("userAuth", {
  state: () => ({
    /**
     *
     * @type {{
     *  username: string;
     *  email:string;
     * password:string;
     * id:string;
     * }}
     */
    user: {
      username: "",
      email: "",
      password: "",
    },
    /**
     *
     * @type {boolean}
     */
    isAuthenticated: false,
    /**
     *
     * @type {boolean|string}
     */
    error: false,
    /**
     *
     * @type {boolean}
     */
    loading: false,
  }),
  actions: {
    loadUser() {
      this.loading = true;
      const token = localStorage.getItem("token");
      if (token) {
        this.loading = false;
        const user = users.getUserById(token);
        if (user.error) {
          localStorage.removeItem("token");
          this.isAuthenticated = false;
          return (this.error = user.error);
        }
        this.isAuthenticated = true;
        this.user = user;
        return user;
      } else {
        this.error = "No user is logged in";
        this.isAuthenticated = false;
        return null;
      }
    },
    
    loginUser(email, password) {
      this.loading = true;
      const res = users.login(email, password);
      if (res.error) {
        this.error = res.error;
        this.loading = false;
        this.isAuthenticated = false;
        return { success: true, error: res.error };
      }
      this.loading = false;
      this.error = false;
      this.user.email = res.email;
      this.user.username = res.username;
      this.user.password = res.password;
      this.isAuthenticated = true;

      return { success: true, error: false };
    },
    registerUser(email, password, fullname) {
      this.loading = true;
      const res = users.register(email, password, fullname);
      if (res.error) {
        this.error = res.error;
        this.loading = false;
        this.isAuthenticated = false;
        return;
      }
      const loginError = this.loginUser(res.email, res.password);
      this.error = loginError;
      this.loading = false;
      this.isAuthenticated = !loginError;
    },
    logout() {
      users.logout();
      this.user = {
        username: "",
        email: "",
        password: "",
      };
      this.isAuthenticated = false;
    },
  },
});

export default useAuth;
