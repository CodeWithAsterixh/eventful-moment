import { generateToken } from "@/lib/helpers";

export class User {
  fullname = "";
  email = "";
  password = "";
  /**
   *
   * @type {{
   *  username: string;
   *  email:string;
   * password:string;
   * id:string;
   * }[]}
   */
  data = [];

  defaultStoreName = "UserDB";

  /**
   *
   * @type {{
   *  username: string;
   *  email:string;
   * password:string;
   * id:string;
   * }[]}
   */
  defaultInitialData = [];

  /**
   *
   * @param {string} storeName
   * @param {{
   *  username: string;
   * }[]} initData
   */
  constructor(storeName, initData) {
    this.defaultStoreName = storeName || this.defaultStoreName;
    this.defaultInitialData = initData || this.defaultInitialData;
    this.initializeStorage();
  }

  initializeStorage() {
    // Initialize the local storage with the default store name and initial data
    const storage = localStorage.getItem(this.defaultStoreName);
    if (storage) {
      this.data = JSON.parse(storage);
    } else {
      localStorage.setItem(
        this.defaultStoreName,
        JSON.stringify(this.defaultInitialData)
      );
      this.data = this.defaultInitialData;
    }
  }

  /**
   *
   * @returns {
   *      user: {
   *          email: string;
   *          password: string;
   *          username: string;
   *          id: string;
   *      }[]
   * }
   */
  getUsers() {
    return this.data;
  }

  /**
   *
   * @param {string} id
   * @returns {{
   *      error: string;
   *      user: null;
   *  } | {
   *      error: false;
   *      user: {
   *          email: string;
   *          password: string;
   *          username: string;
   *          id: string;
   *      };
   *  }}
   */
  getUserById(id) {
    const user = this.data.find((users) => users.id === id);
    if (!user) {
      return {
        error: "user not found, please register the account",
        user: null,
      };
    }

    return { error: false, user };
  }
  /**
   *
   * @param {string} email
   * @returns {{
   *      error: string;
   *      user: null;
   *  } | {
   *      error: false;
   *      user: {
   *          email: string;
   *          password: string;
   *          username: string;
   *          id: string;
   *      };
   *  }}
   */

  getUserByEmail(email) {
    if (this.data.length === 0) {
      return {
        error: "user not found, please register the account",
        user: null,
      };
    }

    const user = this.data.find((users) => users.email === email);
    if (!user) {
      return {
        error: "user not found, please register the account",
        user: null,
      };
    }
    return { error: false, user };
  }
  /**
   *
   * @param {string} email
   * @param {string} password
   * @returns {{
   *      error: string;
   *      user: null;
   *  } | {
   *      error: false;
   *      user: {
   *          email: string;
   *          password: string;
   *          username: string;
   *          id: string;
   *      };
   *  }}
   */
  login(email, password) {
    const res = this.getUserByEmail(email);
    console.log(res)
    if (res.error) {
      return res;
    }
    if (res.user.password !== password) {
      return {
        error: "wrong password, check password and try again",
        user: null,
      };
    }
    localStorage.setItem("token", res.user.id);
    return { error: false, user: res.user };
  }
  createId() {
    let token = generateToken();
    if (this.data.length > 0 && !this.getUserById(token).error) {
      this.createId();
    }
    return token;
  }
  logout() {
    localStorage.removeItem("token");
  }
  /**
   *
   * @param {string} email
   * @param {string} password
   * @param {string} fullname
   * @returns {{
   *      error: string;
   *      user: null;
   *  } | {
   *      error: false;
   *      user: {
   *          email: string;
   *          password: string;
   *          username: string;
   *          id: string;
   *      };
   *  }}
   */
  register(email, password, fullname) {
    const res = this.getUserByEmail(email);
    if (!res.error) {
      return { error: "user already exists", user: null };
    }
    let id = this.createId();

    const newData = {
      email,
      password,
      username: fullname,
      id,
    };
    this.data = [...this.data, newData];
    this.updateLocalStore();

    return { error: false, user: newData };
  }
   /**
     * 
     * @param {{
      *          email: string;
      *          password: string;
      *          username: string;
      *          id: string;
      *      }} user 
     * @param {string} password 
     * @returns {{
      *      error: string;
      *      user: null;
      *  } | {
      *      error: false;
      *      user: {
      *          email: string;
      *          password: string;
      *          username: string;
      *          id: string;
      *      };
      *  }}
     */
  setUserById(user) {
    this.data = [...this.data, user];
    this.updateLocalStore();

    return { error: false, user };
  }

  updateLocalStore() {
    localStorage.setItem(this.defaultStoreName, JSON.stringify(this.data));
  }
}
