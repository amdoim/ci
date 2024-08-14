
import { globalConfig } from "../../chinelo.config"


export function validateEmail (email){
  return String(email)
}

export function compact(data){

  return {... data, title: globalConfig.title, url: globalConfig.mainUrl}

}
