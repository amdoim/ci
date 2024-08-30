
export function clear(data, size = 8){
 if(data) return data
    .replace(/\s{2,}/g, ' ')
    .replace(/ /g,"_")
    .substring(0,size)
    .replace(/[^\w\s]/gi, '')
}

