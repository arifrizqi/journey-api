require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const usersRoute = require('./routes/users-route');
const companiesRoute = require('./routes/companies-route');
const vacanciesRoute = require('./routes/vacancies-route');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', usersRoute);
app.use('/api/companies', companiesRoute);
app.use('/api/vacancies', vacanciesRoute);

app.get('/', (req, res) => {
    res.send('<h1>Server Running...</h1>');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));