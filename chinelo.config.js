const url = (process.env.NODE_ENV != 'prod') ? 'https://dinheirus.com' : "http://localhost:3000"

export const globalConfig = {
    title: 'Dinheirus - D$',
    port: 3000, 
    mainUrl: url,
    rootPath: __dirname
}