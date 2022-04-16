import axios from "axios"


export const signup = (body) => {

    return axios.post('/api/users', body)


}
export const login = creds => {


    return axios.post('/api/auth', creds);

}
export const getUsers = (page = 0, size = 5) => {


    return axios.get(`/api/users?page=${page}&size=${size}`);

}


export const changeLanguage = language => {

    axios.defaults.headers['Accept-Language'] = language


}
export const getUser = (username) => {


    return axios.get(`/api/users/${username}`);

}
export const updateUser = (username, body) => {


    return axios.put(`/api/users/${username}`, body);

}
export const setAuthorizationHeader = ({isLoggedIn, token}) => {
    if (isLoggedIn) {
        const authorizationHeaderValue = `Bearer ${token} `
        axios.defaults.headers['Authorization'] = authorizationHeaderValue
    } else {
        axios.defaults.headers['Authorization'] = ""
    }


}
export const postHoax = (hoax) => {
    return axios.post('/api/hoaxes', hoax)
}
export const getHoaxes = (username, page = 0) => {
    const path = username ? `/api/users/${username}/hoaxes?page=` : '/api/hoaxes?page=';
    return axios.get(path + page);
}
export const getOldHoaxes = (id, username) => {
    const path = username ? `/api/users/${username}/hoaxes/${id}` : `/api/hoaxes/${id}`
    return axios.get(path);
};
export const getNewHoaxesCount = (id, username) => {
    const path = username ? `/api/users/${username}/hoaxes/${id}?count=true` : `/api/hoaxes/${id}?count=true`
    return axios.get(path);
};
export const getNewHoaxes = (id, username) => {
    const path = username ? `/api/users/${username}/hoaxes/${id}?direction=after` : `/api/hoaxes/${id}?direction=after`
    return axios.get(`/api/hoaxes/${id}?direction=after`)
}

export const postHoaxAttachment = attachment => {

    return axios.post('/api/hoax-attachments', attachment)
}
export const deleteHoax = id => {

    return axios.delete(`/api/hoaxes/${id}`)
}

export const deleteUser = username => {
    return axios.delete(`/api/users/${username}`)
}
export const logout = () => {
    return axios.post('/api/logout');
}