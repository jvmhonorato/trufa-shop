require('dotenv').config({ path: '../../.env.producao'})

const https = require("https")
const axios = require("axios")
const fs = require("fs")


const apiProduction = 'https://api-pix.gerencianet.com.br'
const apiStaging = 'https://api-pix-h.gerencianet.com.br'
const baseURL = process.env.GN_ENV === 'producao' ? apiProduction : apiStaging


const getToken = async() =>{

    //Insira o caminho de seu certificado .p12 dentro de seu projeto
const certificado = fs.readFileSync('../'+process.env.GN_CERTIFICADO)

//Insira os valores de suas credenciais em desenvolvimento do pix
const credenciais = {
  client_id: process.env.GN_CLIENT_ID,
  client_secret: process.env.GN_CLIENT_SECRET
}

const data = JSON.stringify({ grant_type: "client_credentials" })
const data_credentials = credenciais.client_id + ":" + credenciais.client_secret

// Codificando as credenciais em base64
const auth = Buffer.from(data_credentials).toString("base64")

const agent = new https.Agent({
  pfx: certificado,
  passphrase: "",
});
//Consumo em desenvolvimento da rota post oauth/token
const config = {
  method: "POST",
  url: baseURL + "/oauth/token",
  headers: {
    Authorization: "Basic " + auth,
    "Content-Type": "application/json",
  },
  httpsAgent: agent,
  data: data,
}

const result = await axios(config)
  
    console.log(result.data)
    return result.data
  
}
// chargeData será cob na função run()
const  createCharge = async(accessToken, chargeData) => {
    //Insira o caminho de seu certificado .p12 dentro de seu projeto
const certificado = fs.readFileSync('../'+process.env.GN_CERTIFICADO)
const data = JSON.stringify(chargeData)




const agent = new https.Agent({
  pfx: certificado,
  passphrase: "",
});
//Consumo em desenvolvimento da rota post oauth/token
const config = {
  method: "POST",
  url: baseURL + "/v2/cob",
  headers: {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  },
  httpsAgent: agent,
  data: data,
}

const result = await axios(config)
  
    return result.data

}

const  getLoc = async(accessToken, locId) => {
  //Insira o caminho de seu certificado .p12 dentro de seu projeto
const certificado = fs.readFileSync('../'+process.env.GN_CERTIFICADO)




const agent = new https.Agent({
pfx: certificado,
passphrase: "",
});
//Consumo em desenvolvimento da rota post oauth/token
const config = {
method: "GET",
url: baseURL +'/v2/loc/'+locId +'/qrcode',
headers: {
  Authorization: "Bearer " + accessToken,
  "Content-Type": "application/json",
},
httpsAgent: agent,

}

const result = await axios(config)

  return result.data

}



const createPixCharge = async() => {
  const chave = process.env.CHAVE_PIX
  const token = await getToken()
  const accessToken = token.access_token
  const cob = {
    
  
      "calendario": {
        "expiracao": 3600
      },
      "devedor": {
        "cpf": "12345678909",
        "nome": "Victor Honorato"
      },
      "valor": {
        "original": "123.45"
      },
      "chave":chave ,
      "solicitacaoPagador": "Informe o número ou identificador do pedido."
    
  }
  const cobranca = await createCharge(accessToken, cob)
  const qrcode =await getLoc(accessToken, cobranca.loc.id)
  return qrcode,cobranca
  
  
}
module.exports={
    createPixCharge
}