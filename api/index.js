const app = require('express')();

const https = require('https');
const http = require('http');

var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.PERSONAL_ACCESS_TOKEN}).base('appu7hWfYaoLbwEFC');

const PORT = 8000
app.set('port', (process.env.PORT || PORT));


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


app.get('/api/check_user/:email', async (req, res) => {
    const userFormEmail = req.params.email
    console.log(userFormEmail)

    const data = await getAirtableByEmail(userFormEmail)
    const airtableEmail = data[0].fields.Email
    const airtableApproved = data[0].fields.Approved

    if (airtableEmail === userFormEmail && airtableApproved) {
        return res.send({ is_approved: true })
    } 

    return res.send({ is_approved: true })
})


app.listen(PORT, () => console.log("Live at, ", app.get('port')))


module.exports = app
