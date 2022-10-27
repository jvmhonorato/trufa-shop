const fs = require('fs')
//import
const {GoogleSpreadsheet} = require('google-spreadsheet');

require('dotenv').config({ path: '../.env.'})

const credentials = require('../credentials.json');

//sheet ID 
const doc = new GoogleSpreadsheet(
    '1YvCVl1Ca-o9r6doZMgn5YAQHsfFsudx55t_lmAZj2vo'
    )


const saveOrder = async(order) => {
    await doc.useServiceAccountAuth({
        client_email:process.env.EMAIL_GOOGLE_API ,
        private_key: credentials.private_key
    })
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[1]
    console.log(order)
    // await sheet.addRows([
    //     {
    //         'Pedido:':123,
    //         'Nome Cliente:':order.nome,	
    //         'Telefone Cliente:': order.telefone,	
    //         'Produto':	item.name,
    //         'Quantidade:':item.quantity,	
    //         'Subtotal:':	item.subtotal,
    //         'Total:':5,	
    //         'Status:':'Aguardando pagamento',
    //     },
    // ])
    // console.log( 'connected...', sheet.title)
}
module.exports = {
    saveOrder
}