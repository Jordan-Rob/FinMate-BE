const servers1 = require('./servers')

module.exports = {
    openapi: "3.0.3", // present supported openapi version
    info: {
      title: "FinMate financial assistant API", // short title.
      description: "FinMate API", //  desc.
      version: "1.0.0", // version number
      contact: {
        name: "Jordan Rob", // your name
        email: "jordanrob709@gmail.com", // your email
        url: "web.com", // your website
      },
    },
    servers:[
      {
        url: "http://localhost:3001", // url
        description: "Local server", // name
      },
    ],
    tags: [
      {
        name: "Budget CRUD operations", // name of a tag
      },
    ],
    components: {
      schemas: {
        // budget model
        Budget: {
          type: "object", // data type
          properties: {
            money: {
              type: "string", // data-type
              description: "money under budget", // desc
              example: "2,000,000 /=", // example of an id
            },
            duration: {
              type: "string", // data-type
              description: "budget duration", // desc
              example: "2 weeks", // example of a title
            },
            expenditures: {
              type: "objectID", // data type
              description: "reference ID to expenditures under budget", // desc
              example: false, // example of a completed value
            },
          },
        },
        // user model
        User: {
          type: "object", // data type
          properties: {
            name: {
              type: "string", // data type
              description: "User's name", // desc
              example: "Jon Doe", // example of a title
            },
            username: {
              type: "string", // data type
              description: "The username of the user", // desc
              example: false, // example of a completed value
            },
            password: {
              type: "string", // data type
              description: "The password of the user", // desc
              example: false, // example of a completed value
            },
          },
        },
        // error model
        Error: {
          type: "object", //data type
          properties: {
            message: {
              type: "string", // data type
              description: "Error message", // desc
              example: "Not found", // example of an error message
            },
            internal_code: {
              type: "string", // data type
              description: "Error internal code", // desc
              example: "Invalid parameters", // example of an error internal code
            },
          },
        },
      },
    },
    // method of operation
  paths:{
      '/budgets':{
        get: {
          tags: ["Budget CRUD operations"], // operation's tag.
          description: "Get budgets", // operation's desc.
          operationId: "getBudgets", // unique operation id.
          parameters: [], // expected params.
          // expected responses
          responses: {
            // response code
            200: {
              description: "Budgets were obtained", // response desc.
              content: {
                // content-type
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Budget", // Budget model
                  },
                },
              },
            },
          },
        },

        // operation's method
        post: {
          tags: ["Budget CRUD operations"], // operation's tag
          description: "Create Budget", // short desc
          operationId: "createBudget", // unique operation id
          parameters: [], // expected params
          requestBody: {
            // expected request body
            content: {
              // content-type
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Budget", // budget data model
                },
              },
            },
          },
          // expected responses
          responses: {
            // response code
            201: {
              description: "Budget created successfully", // response desc
            },
            // response code
            500: {
              description: "Server error", // response desc
            },
          },
        },

      },

      '/budgets/{id}':{
        // operation's method
        get: {
          tags: ["Budget CRUD operations"], // operation's tag.
          description: "Get a budget", // operation's desc.
          operationId: "getBudget", // unique operation id
          parameters: [
            // expected params.
            {
              name: "id", // name of the param
              in: "path", // location of the param
              required: true, // Mandatory param
              description: "A single budget id", // param desc.
            },
          ],
          // expected responses
          responses: {
            // response code
            200: {
              description: "Budget is obtained", // response desc.
              content: {
                // content-type
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Budget", // budget data model
                  },
                },
              },
            },
            // response code
            404: {
              description: "Budget is not found", // response desc.
              content: {
                // content-type
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error", // error data model
                  },
                },
              },
            },
          },
        },


        // operation's method
        put: {
          tags: ["Budget CRUD operations"], // operation's tag
          description: "Update budget", // short desc
          operationId: "updateBudget", // unique operation id
          parameters: [
            // expected params
            {
              name: "id", // name of param
              in: "path", // location of param
              required: true, // mandatory
              description: "Id of budget to be updated", // short desc.
            },
          ],
          // expected responses
          responses: {
            // response code
            200: {
              description: "Budget updated successfully", // response desc.
            },
            // response code
            404: {
              description: "Budget not found", // response desc.
            },
            // response code
            500: {
              description: "Server error", // response desc.
            },
          },
        },

        // operation's method.
        delete: {
          tags: ["Budget CRUD operations"], // operation's tag
          description: "Deleting a Budget", // short desc
          operationId: "deleteBudget", // unique operation id
          parameters: [
            // expected parameters
            {
              name: "id", // name of param
              in: "path", // location of param
              required: true, // mandatory
              description: "Deleting a budget", // param desc
            },
          ],
          // expected responses
          responses: {
            // response code
            200: {
              description: "Budget deleted successfully", // response desc
            },
            // response code
            404: {
              description: "Budget not found", // response desc
            },
            // response code
            500: {
              description: "Server error", // response desc
            },
          },
        },

      }
    }
  };
  