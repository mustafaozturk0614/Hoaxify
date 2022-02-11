import axios from "axios"



export const signup = (body) => {

    return axios.post('/api/users', body)


}
export  const  login=creds=>{

    return axios.post('/api/auth',{},{auth:creds});
}

export const changeLanguage = language => {

    axios.defaults.headers['Accept-Language'] = language


}