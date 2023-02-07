/*Axios is a promise based HTTP client for the browser and Node. js
send asynchronous HTTP requests to REST endpoints and perform CRUD operations*/
import axios from "axios"
//redux store
import store from "../store"
//logout action
import {logout} from "../store/actions/auth"


//creates an AXIOS instance used to make requests to the Back-End
// const API = axios.create({
//     baseURL: "http://127.0.0.1:3000",
//     headers: {
//         "Accept": "application/json",
//         "Authorization": `Bearer ${localStorage.getItem("token").replace(/^"(.*)"$/, '$1') || ""}`  //check if we already have a token and set it
//     }
// })

//get token from local storage if already logged in
let token = ""
localStorage.hasOwnProperty('token') ? token = `Bearer ${localStorage.getItem("token").replace(/^"(.*)"$/, '$1')}` : token = ""


const API = axios.create({
    baseURL: "http://127.0.0.1:3000",
    headers: {
        "Accept": "application/json",
        "Authorization": token
    }
})


//create interceptor to listen to errors
API.interceptors.response.use(

    //successful response
    res => {
        return res
    },
    err => {
        // token expired errors are always 401 error
        if (err.response.status !== 401){
            throw err
        }

        if (typeof err.response.data.error.name !== "undefined"){
            if (err.response.data.error.name  === "TokenExpiredError"){  //this error is provided by JWT
                //logout user
                store.dispatch(logout())
                
                throw err
            }
        }
    }

)


export default API