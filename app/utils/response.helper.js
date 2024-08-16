
import { globalConfig } from "../../chinelo.config"
import bcrypt from "bcrypt"


export function compact(data){

  return {... data, title: globalConfig.title, url: globalConfig.mainUrl}

}


export function clear(data, size = 8){
  return data.replace(/\s{2,}/g, ' ').replace(/ /g,"_").substring(0,size)
}