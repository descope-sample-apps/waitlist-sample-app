require('dotenv').config()

var express = require('express')
var cors = require('cors')
var app = express()

var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.PERSONAL_ACCESS_TOKEN}).base('appu7hWfYaoLbwEFC');

const PORT = 8000


app.use(cors())


async function getAirtableByEmail(email) {
    const data = base('Registration')
                .select({ filterByFormula: `email = "${email}"`})
                .firstPage()
                .then(records => {
                    return records
                })
                .catch( err => {
                    return err
                });

    return data
}


app.get('/', async (req, res) => {
    return res.send("test")
})


app.get('/check_user/:email', async (req, res) => {
    console.log("bob")
    const userFormEmail = req.params.email

    const data = await getAirtableByEmail(userFormEmail)
    const airtableEmail = data[0].fields.Email
    const airtableApproved = data[0].fields.Approved

    if (airtableEmail == userFormEmail && airtableApproved) {
        return res.send(true)
    } 

    return res.send(false)
})


app.listen(PORT, () => console.log(`Live at http://localhost:${PORT}`))
