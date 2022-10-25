const fs = require('fs')
//import
const {GoogleSpreadsheet} = require('google-spreadsheet')
require('dotenv').config({ path: '../.env.producao'})

const credentials = require('../credentials.json');

//sheet ID 
const doc = new GoogleSpreadsheet(
    '1YvCVl1Ca-o9r6doZMgn5YAQHsfFsudx55t_lmAZj2vo'
    )


const run = async() => {
    await doc.useServiceAccountAuth({
        client_email:process.env.EMAIL_GOOGLE_API ,
        private_key: credentials.private_key
    })
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[1]
    await sheet.addRows([
        {
            'Pedido:':123,
            'Nome Cliente:':'Agda Honorato',	
            'Telefone Cliente:': '55 664646466',	
            'Produto':	'Trufa morango',
            'Quantidade:':1,	
            'Subtotal:':	5,
            'Total:':5,	
            'Status:':'Aguardando pagamento',
        },
    ])
    console.log( 'connected...', sheet.title)
}
run()