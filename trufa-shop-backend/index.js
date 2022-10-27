const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(express.json())
 
app.get('/', (req, res)=> {
    res.send({ ok: true })
})

app.post('/create-order', async (req, res) => {
    console.log(req.body)
    res.send({ ok: 1 })
})

app.listen(3001, (err)=> {
    console.log(`running`,err)
})