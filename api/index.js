const app = require('express')();

var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.PERSONAL_ACCESS_TOKEN}).base(process.env.AIRTABLE_BASE);

const PORT = 8000
app.set('port', (process.env.PORT || PORT));


async function getAirtableByEmail(email) {
    const data = base('Registration')
                .select({ filterByFormula: `email = "${email}"`})
                .firstPage()
                .then(records => {
                    if (records.length === 0) {
                        return null
                    }
                    return records
                })
                .catch( err => {
                    console.log(err)
                    return err;
                });

    return data
}


app.get('/api/check_user/:email', async (req, res) => {
    const userFormEmail = req.params.email
    console.log(userFormEmail)

    const data = await getAirtableByEmail(userFormEmail)
    console.log(data)

    if (!data) {
        return res.send({ is_approved: false })
    }

    const airtableEmail = data[0].fields.Email
    const airtableApproved = data[0].fields.Approved

    if (airtableEmail === userFormEmail && airtableApproved) {
        return res.send({ is_approved: true })
    } 

    return res.send({ is_approved: false })
})


app.post('/api/add_user/:email', (req, res) => {
    const userFormEmail = req.params.email

    base('Registration').create([
        {
            "fields": {
                "Email": userFormEmail,
                "Approved": false
            }
        }], (err, records) => {
            if (err) {
                console.error(err);
                return err;
            }
            return res.send({ is_approved: false })
        }
    );
})


app.listen(PORT, () => console.log("Live at, ", app.get('port')))


module.exports = app
