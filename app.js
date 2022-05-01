require('dotenv').config();
require('express-async-errors');

//extra security
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')


//Swagger
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDoc = YAML.load('./swagger.yaml')




const express = require('express');
const app = express();

//connect DB
const connect = require('./db/connect')
//Routers
const authRouter = require('./routes/auth')
const jobRouter = require('./routes/jobs')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const auth = require('./middleware/authentication');
const { default: rateLimit } = require('express-rate-limit');

app.use(express.json());
// extra packages
app.set('trust proxy',1)
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100,
}))
app.use(cors())
app.use(helmet())
app.use(xss())


app.get('/',(req,res)=>{
  res.send('<h1>Jobs API </h1><a href="/api-docs">Documentation</a>')
})
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDoc))
// routes
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs',auth,jobRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connect(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
