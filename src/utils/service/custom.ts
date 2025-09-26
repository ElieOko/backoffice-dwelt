// import { useUserLocal } from "@/stores/user/local";
import axios, { type AxiosInstance } from "axios";

const serverUrl = "127.0.0.1"
const port = 8000
const aliasPath = "/api/";
export const useAxiosRequest = (token:string = "") : AxiosInstance  =>{
    const useAxios: AxiosInstance = axios.create({
        baseURL               : `https://serverdw.cadeauparfait1.com${aliasPath}`,
        headers   : {
          accept: 'application/json',
          "Content-type"      :   "application/json",
          "X-Requested-With"  :   "XMLHttpRequest",
          "x-auth-token"     :   `${token}`
        },
      })
      return useAxios
}