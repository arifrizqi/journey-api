const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users-route');
const companiesRoutes = require('./routes/companies-route');

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', usersRoutes);
app.use('/api/companies', companiesRoutes);

app.get('/', (req, res) => {
    res.send('<h1>Server Running...</h1>');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));