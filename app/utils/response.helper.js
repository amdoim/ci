
import { globalConfig } from "../../chinelo.config"

function helper(){}

export function compact(data){

  return {... data, title: globalConfig.title, url: globalConfig.mainUrl}

}



export function clear(data, size = 8){
  return data.replace(/\s{2,}/g, ' ').replace(/ /g,"_").substring(0,size)
}

