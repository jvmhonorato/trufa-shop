const fs = require('fs')
//import
const {v4} = require('uuid')
const {GoogleSpreadsheet} = require('google-spreadsheet');

require('dotenv').config({ path: '../.env.homologacao'})

const credentials = require('../credentials.json');

//sheet ID 
const doc = new GoogleSpreadsheet(
    '1YvCVl1Ca-o9r6doZMgn5YAQHsfFsudx55t_lmAZj2vo'
    )

//use this func to save data from frontend
const saveOrder = async(order) => {
    await doc.useServiceAccountAuth({
        client_email:process.env.EMAIL_GOOGLE_API ,
        private_key: credentials.private_key
    })
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[1]
    console.log(order)
    
    //use reduce to grab the total value purchases
    const total = order.items.reduce((prev, curr) => {
        return prev + curr.price * curr.quantity
    },0)

    //v4() uuid generate ID request
    const orderId = v4()

    //order.items come from frontend/cart.js  OBS: the name must be the same as the worksheet 
    const rows = order.items.map(item => {
        row = {
            
                'Pedido:': orderId,
                'Nome Cliente:':order.nome,	
                'Telefone Cliente:': order.telefone,	
                'Produto:':	item.name,
                'Quantidade:': item.quantity,
                'Valor Unitario:':item.price,	
                'Subtotal:':	item.price * item.quantity,
                'Total:':total,	
                'Status:':'Aguardando pagamento',
                'cpf:':order.cpf
            
        }
        return row
    })
    // render on rows of sheets
    await sheet.addRows(rows)
    
}
module.exports = {
    saveOrder,
}