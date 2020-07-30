const express = require('express')
const connectDB = require('./db')
const router = express.Router()
const cors = require('cors')

connectDB()

const users = require('./api/routes/users')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', '*');
//   res.setHeader('Content-Type', '*');
//   if (req.method === 'OPTIONS') {
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
//     return res.status(200).json({});
//   }
//   next();
// })

app.use('/api/users', users)

const PORT = 3000;

router.get('/', (req, res) => {
  res.send('Home route of api');
});

app.listen(PORT, console.log(`Server is running in DEV mode on ${PORT}`));