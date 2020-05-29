import axios from 'axios'
export const uploadImages = data => {
    return axios({
        method: 'post',
        url: "/api",
        data: data
    })
}