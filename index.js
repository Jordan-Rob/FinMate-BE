const http = require('http')
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')
const  swaggerJsdoc = require("swagger-jsdoc")
const  swaggerUi = require("swagger-ui-express");


const server = http.createServer(app)

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
          url: "http://localhost:3000/",
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
  

server.listen(config.PORT, () => {
    logger.info(`Server is runnin on ${config.PORT}`)
})