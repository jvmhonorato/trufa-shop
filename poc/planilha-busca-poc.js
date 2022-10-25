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
    
    //count sheets
    const maxRows = sheet.rowCount

    //load cells with tag 'A1,H1' until maxRows count
    await sheet.loadCells('A1:A' + maxRows)
    await sheet.loadCells('H1:H' + maxRows)

    //stay count array and give back object inside array
    const validIndex = [...Array(maxRows-1).keys()]

    const orderId = 2
    const status = 'Pago com Pix'

    //loop for to walk on the sheets
    for await (const i of validIndex){
        const cell = await sheet.getCell(1 + i, 0)
        //condition to render only the sheets with value be equal to orderId
        if (cell.value){
            if(cell.value === orderId){
             
           // getCell value (row, column)
           const statusCell = await sheet.getCell(1+i, 7)

           //put value of const status in  statusCell above(1+i, 7)
           statusCell.value = status
      
            }
           
        }else{
            break
        }
       
    }
 await sheet.saveUpdatedCells()
   
}
run()