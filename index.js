const http = require('http')
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')
//const  swaggerJsdoc = require("swagger-jsdoc")
const  swaggerUI = require("swagger-ui-express");
const docs = require('./docs');



const server = http.createServer(app)
/*
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "FinMate Express API with Swagger",
        version: "0.1.0",
        description:
          "This is an API application for FinMate made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Jordan-Rob",
          url: "https://jordan-rob.netlify.app/",
          email: "jordanrob709@gmail.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3001/",
        },
      ],
    },
    apis: ["./controllers/budgets.js"],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );
*/
  
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));

server.listen(config.PORT, () => {
    logger.info(`Server is runnin on ${config.PORT}`)
})