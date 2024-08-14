const url = (process.env.NODE_ENV == 'prod') ? 'https://dinheirus.com' : "http://localhost:3000"

export const globalConfig = {
    title: 'Dinheirus - D$',
    port: 3000, 
    mainUrl: url,
    rootPath: __dirname
}

/**
 * sudo docker image build -t umruivo/dinheirus:0.1.31 .
 * sudo docker push umruivo/dinheirus:0.1.31
 * 
 * 
 * 
 * 
 */