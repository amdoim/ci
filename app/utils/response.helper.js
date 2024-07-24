export function compact(data){
  data = {... data, titulo: process.env.TITULO}
 return {
    locals:data
  }
}