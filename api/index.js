import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import multer from 'multer';
import Event from "../models/eventDB.js"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path"

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: `${__dirname}/../.env` });

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.set('views', path.join( `${__dirname}/../.`, 'views'));

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join( `${__dirname}/../public`)));
app.use(bodyParser.json());
bodyParser.urlencoded({ extended: true })

// Load emails from JSON file on server start
let emails = [];
try {
    const data = fs.readFileSync('../emails.json');
    emails = JSON.parse(data);
} catch (err) {
    console.error('Error reading emails:', err);
}

function getEmail(req, res, next) {
    let input_value = req.body.Email;
    // console.log(input_value);
    next();
};

app.use(getEmail);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/events', (req, res) => {
    res.render('events');
});
app.get('/about', (req, res) => {
    res.render('about');
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

app.get('/login', (req, res) => {
    res.render("login");
});
// app.get('/admin', (req, res) => {
//     res.render("admin");
// });
// Add event route
// app.get('/addEvent', (req, res) => {
//     res.render('addEvent');
//   });

// Delete event route
// app.get('/delete/:eventId', (req, res) => {
//     const eventId = req.params.eventId; 
//     Event.findByIdAndRemove(eventId, (err) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.redirect('/admin');
//       }
//     });
//   });
  

app.post("/login",(req,res) =>{
    if ( req.body["username"] === process.env.USERNAME || req.body["password"] === process.env.PASSWORD){
        res.render("admin")        

    }else{
        res.render("login")
    }
})

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

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });


// Connect to MongoDB
// const start = async() => {
//     try {
//         await mongoose.connect(process.env.MONGODB, {
//         }).then(() => console.log("connected"))
//         app.listen(port, () => {
//             console.log(`Server is running on port ${port}`);
//         });
//     }
//     catch(e){
//         console.log(e.message)
//     }
// }
// start()





// Set up multer for file uploads
// const upload = multer({ dest: 'uploads/' });

// Routes
// app.get('/admin', (req, res) => {
//   // Fetch all events from the database
//   Event.find({}, (err, events) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.render('admin', { events: events });
//     }
//   });
// });



// app.post('/addEvent', upload.single('eventImage'), (req, res) => {
//   const { title, description, date } = req.body;
//   const image = req.file ? req.file.filename : '';

//   const newEvent = new Event({
//     title: title,
//     description: description,
//     date: date,
//     image: image,
//   });

//   newEvent.save((err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.redirect('/admin');
//     }
//   });
// });


