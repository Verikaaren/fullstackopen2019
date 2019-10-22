const config = require('./utils/config')
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();


const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const middleware = require('./utils/middleware');
const logger = require('./utils/logger')

logger.info('connecting to', config.MONGODB_URI)

mongoose
	.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

	.then(result => {
		logger.info('connected to MongoDB');
	})
	.catch(error => {
		logger.error('error connection to MongoDB:', error.message)
	});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app


