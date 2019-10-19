import axios from "axios";

export const register = newUser => {
    return axios 
    .post("api/users/register",{
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        phone_number: newUser.phone_number,
        username: newUser.username,
        password: newUser.password
    })

    .then(res => {
        console.log("Registered")
    })

}


export const login = user =>{
    return axios
    .post("api/users/login", {
        email: user.email,
        password: user.password
    })
    .then(res=>{
        localStorage.setItem("usertoken", res.data)
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
}

