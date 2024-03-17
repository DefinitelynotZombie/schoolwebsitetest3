import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';

// config(); // Load environment variables from .env file

const app = express();
const port = 3000;

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());
bodyParser.urlencoded({ extended: true })
// Load emails from JSON file on server start
let emails = [];
try {
    const data = fs.readFileSync('emails.json');
    emails = JSON.parse(data);
} catch (err) {
    console.error('Error reading emails:', err);
}

function getEmail(req, res, next) {
    let input_value = req.body.Email;
    // console.log(input_value);
    next();
}
app.use(getEmail);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/events', (req, res) => {
    res.render('events');
});

app.post('/subscribe', (req, res) => {
    const { email } = req.body;
    // Check if the email is empty or already exists in the array
    if (!email || emails.includes(email)) {
        res.status(400).send('Invalid email or duplicate email.');
        return;
    }
    emails.push(email);
    saveEmailsToJson(); // Save emails to JSON file
    res.send('Subscription successful!');
});

app.get('/admin', (req, res) => {
    res.render('admin', { emails });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Function to save emails to JSON file
function saveEmailsToJson() {
    fs.writeFile('emails.json', JSON.stringify(emails), (err) => {
        if (err) {
            console.error('Error saving emails:', err);
        } else {
            console.log('Emails saved successfully!');
        }
    });
}

