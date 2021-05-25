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
      '/todos':{
        get: {
          tags: ["Budget CRUD operations"], // operation's tag.
          description: "Get todos", // operation's desc.
          operationId: "getTodos", // unique operation id.
          parameters: [], // expected params.
          // expected responses
          responses: {
            // response code
            200: {
              description: "Todos were obtained", // response desc.
              content: {
                // content-type
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Todo", // Todo model
                  },
                },
              },
            },
          },
        },

        // operation's method
        post: {
          tags: ["Budget CRUD operations"], // operation's tag
          description: "Create todo", // short desc
          operationId: "createTodo", // unique operation id
          parameters: [], // expected params
          requestBody: {
            // expected request body
            content: {
              // content-type
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TodoInput", // todo input data model
                },
              },
            },
          },
          // expected responses
          responses: {
            // response code
            201: {
              description: "Todo created successfully", // response desc
            },
            // response code
            500: {
              description: "Server error", // response desc
            },
          },
        },

      },

      '/todos/{id}':{
        // operation's method
        get: {
          tags: ["Budget CRUD operations"], // operation's tag.
          description: "Get a todo", // operation's desc.
          operationId: "getTodo", // unique operation id
          parameters: [
            // expected params.
            {
              name: "id", // name of the param
              in: "path", // location of the param
              schema: {
                $ref: "#/components/schemas/id", // data model of the param
              },
              required: true, // Mandatory param
              description: "A single todo id", // param desc.
            },
          ],
          // expected responses
          responses: {
            // response code
            200: {
              description: "Todo is obtained", // response desc.
              content: {
                // content-type
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Todo", // todo data model
                  },
                },
              },
            },
            // response code
            404: {
              description: "Todo is not found", // response desc.
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
          description: "Update todo", // short desc
          operationId: "updateTodo", // unique operation id
          parameters: [
            // expected params
            {
              name: "id", // name of param
              in: "path", // location of param
              schema: {
                $ref: "#/components/schemas/id", // id model
              },
              required: true, // mandatory
              description: "Id of todo to be updated", // short desc.
            },
          ],
          // expected responses
          responses: {
            // response code
            200: {
              description: "Todo updated successfully", // response desc.
            },
            // response code
            404: {
              description: "Todo not found", // response desc.
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
          description: "Deleting a todo", // short desc
          operationId: "deleteTodo", // unique operation id
          parameters: [
            // expected parameters
            {
              name: "id", // name of param
              in: "path", // location of param
              schema: {
                $ref: "#/components/schemas/id", // id model
              },
              required: true, // mandatory
              description: "Deleting a done todo", // param desc
            },
          ],
          // expected responses
          responses: {
            // response code
            200: {
              description: "Todo deleted successfully", // response desc
            },
            // response code
            404: {
              description: "Todo not found", // response desc
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
  