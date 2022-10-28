const express = require('express')
const cors = require('cors')
const {saveOrder} = require('./spreadsheet')
const {createPixCharge} = require('./lib/pix')
const bodyParser = require('body-parser')


const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
 
app.get('/', (req, res)=> {
    res.send({ ok: true })
})

app.post('/create-order', async (req, res) => {
    const qrcode = await createPixCharge()
 // console.log(req.body)
   await saveOrder(req.body)
    res.send({ ok: 1, qrcode })
})

app.listen(3001, (err)=> {
    console.log(`running`,err)
})