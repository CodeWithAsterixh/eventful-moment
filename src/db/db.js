import { generateToken } from "@/lib/helpers"

export class User{
   fullname = ""
    email = ""
    password = ""
    /**
     * 
     * @type {{
     *  username: string;
     *  email:string;
     * password:string;
     * id:string;
     * }[]} 
     */
    data = []
    

   defaultStoreName = "UserDB"

   /**
     * 
     * @type {{
     *  username: string;
     *  email:string;
     * password:string;
     * id:string;
     * }[]} 
     */
   defaultInitialData = []
    
    /**
     * 
     * @param {string} storeName 
     * @param {{
     *  username: string;
     * }[]} initData 
     */
    constructor(storeName, initData){
        this.defaultStoreName = storeName||this.defaultStoreName
        this.defaultInitialData = initData||this.defaultInitialData
        this.initializeStorage()
    }

    initializeStorage(){
        // Initialize the local storage with the default store name and initial data
        const storage = localStorage.getItem(this.defaultStoreName)
        if(storage){
            this.data = JSON.parse(storage)
        }else{
            localStorage.setItem(this.defaultStoreName, JSON.stringify(this.defaultInitialData))
            this.data = this.defaultInitialData
        }
    }

    // actions
    /** get all the users available */
    getUsers(){
        return this.data
    }

    /**
     * 
     * @param {'string'} id 
     * @returns 
     */
    getUserById(id){
        
        const user = this.data.find(users => users.id ===id )
        if(!user){
            return {error:"user not found, please register the account"}
        }

        return user
    }
    /**
     * 
     * @param {*} email 
     * @returns 
     */
    getUserByEmail(email){
        if(this.data.length===0){
            return {error:"user not found, please register the account"}
        }

        const user = this.data.find(users => users.email === email )
        if(!user){
            return {error:"user not found, please register the account"}
        }
        return user
    }
    login(email, password){
        const res = this.getUserByEmail(email)
        if(res.error){
            return res
        }
        if(res.password !== password){
            return {error:"wrong password, check password and try again"}
        }
        localStorage.setItem("token", res.id)
        return res
    }
    createId(){
        let token = generateToken()
        if(this.data.length>0&&!this.getUserById(token).error){
            this.createId()
        }
        return token

    }
    logout(){
        localStorage.removeItem("token")
    }
    register(email, password, fullname){
        const res = this.getUserByEmail(email)
        if(!res.error){
            return {error:"user already exists"}
        }
        let id = this.createId()
        
        const newData = {
            email,
            password,
            username:fullname,
            id
        }
        this.data = [...this.data, newData]
        this.updateLocalStore()
        return newData
    }
    setUserById(user){
        this.data = [...this.data, user]
        this.updateLocalStore()
        return user
    }

    updateLocalStore(){
        localStorage.setItem(this.defaultStoreName, JSON.stringify(this.data))
    }
}

