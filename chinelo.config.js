const url = (process.env.NODE_ENV == 'prod') ? 'https://dinheirus.com' : "http://192.168.0.109:3000"

export const globalConfig = {
    title: 'Dinheirus - D$',
    port: 3000, 
    mainUrl: url,
    rootPath: __dirname,
    maxAge: 60000
}

/**
 * sudo docker image build -t umruivo/dinheirus:0.1.31 .
 * sudo docker push umruivo/dinheirus:0.1.31
 * 
 * 
 * 
 * 
 */