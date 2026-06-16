import axios from 'axios'

export let axiosInstance=axios.create({
    baseURL:'http://localhost:8000',
    withCredentials:true
})

axiosInstance.interceptors.response.use(
    (res)=>{
  return res
},async (error)=>{

    let originalReq=error.config

    if(error.response.status==401 &&  !originalReq.retry && originalReq.url=='/me'){
        originalReq.retry=true
       await axiosInstance.get('/api/auth/accessToken')
       return axiosInstance(originalReq)
    }

    Promise.reject(error)
}
)