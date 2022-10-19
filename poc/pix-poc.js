require('dotenv').config({ path: '../.env.homologacao'})

const https = require("https")
const axios = require("axios")
const fs = require("fs")


const apiProduction = 'https://api-pix.gerencianet.com.br'
const apiStaging = 'https://api-pix-h.gerencianet.com.br'
const baseURL = process.env.GN_ENV === 'producao' ? apiProduction : apiStaging


const getToken = async() =>{
  const accessToken = token.access_token
    //Insira o caminho de seu certificado .p12 dentro de seu projeto
const certificado = fs.readFileSync('../'+process.env.GN_CERTIFICADO)
const data = JSON.stringify({ grant_type: "client_credentials" })




const agent = new https.Agent({
  pfx: certificado,
  passphrase: "",
});
//Consumo em desenvolvimento da rota post oauth/token
const config = {
  method: "POST",
  url: baseURL + "/oauth/token",
  headers: {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  },
  httpsAgent: agent,
  data: data,
}

const result = await axios(config)
  
    console.log(result.data)
  
}


const run = async() => {
  const token = await getToken()
  
  
}
run()