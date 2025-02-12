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
    /**
     * @returns  {{error:false, user:{
     *  username: string;
     *  email:string;
     * password:string;
     * id:string;
     * }|null}}
     */
    loadUser() {
      this.loading = true;
      const token = localStorage.getItem("token");
      if (token) {
        this.loading = false;
        const res = users.getUserById(token);
        if (res.error) {
          localStorage.removeItem("token");
          this.isAuthenticated = false;
          this.error = res.error
          return res;
        }
        this.isAuthenticated = true;
        this.user = res.user;
        this.error = res.error;
        return res;
      } else {
        this.error = "No user is logged in";
        this.isAuthenticated = false;
        return { error: true, user: null };
      }
    },

    loginUser(email, password) {
      this.loading = true;
      const res = users.login(email, password);
      if (res.error) {
        this.error = res.error;
        this.loading = false;
        this.isAuthenticated = false;
        return res;
      }
      this.loading = false;
      this.error = false;
      this.user = res.user
      this.isAuthenticated = true;

      return res;
    },
    /**
     *
     * @param {string} email
     * @param {string} password
     * @param {string} fullname
     * @returns {{ {
     *error: string;
     *user: null;
     *} | {
     *error: false;
     *user: {
     *email: string;
     * password: string;
     *  username: string;
     *   id: string;
     *};
     *}}}
     */
    registerUser(email, password, fullname) {
      this.loading = true;
      const res = users.register(email, password, fullname);
      if (res.error && !res.user) {
        this.error = res.error;
        this.loading = false;
        this.isAuthenticated = false;
        return res;
      }
      console.log(res)
      const loginError = this.loginUser(res.user.email, res.user.password);
      console.log(loginError);
      this.error = loginError.error;
      if (this.error) {
        this.loading = false;
        this.isAuthenticated = false;
        return {error: this.error, user: null};
      }
      this.loading = false;
      this.isAuthenticated = !loginError.error;
      return res;
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
