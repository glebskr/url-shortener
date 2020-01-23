const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const auth = require('./routes/auth')
const link = require('./routes/link')
const redirect = require('./routes/redirect')


const app = express();
app.use(bodyParser.json())
const PORT = config.get('port') || 3000

app.use('/api/auth', auth)
app.use('/api/link', link)
app.use('/t', redirect)


async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true, 
            useCreateIndex: true,
        }, (err) => {
            if(err)
                console.log(err)
            else 
                console.log('Connected to DB successfully')
        })

        app.listen(PORT, () => console.log('App has been started, port: ' + PORT))

    }
    catch(e) {
       console.log('Server Error', e.message)
       process.exit(1) 
    }
}
 
 start()