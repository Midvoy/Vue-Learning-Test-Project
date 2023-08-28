import axios from 'axios'

const service= axios.create({
    baseURL:'http://58.87.89.170:8081',
    timeout: 10000,
    async:true,
    crossDomain:true,
})
export default service