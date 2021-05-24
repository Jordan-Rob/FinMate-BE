const servers1 = require('./servers')

module.exports = {
    openapi: "3.0.3", // present supported openapi version
    info: {
      title: "Simple Todos API", // short title.
      description: "A simple todos API", //  desc.
      version: "1.0.0", // version number
      contact: {
        name: "John doe", // your name
        email: "john@web.com", // your email
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
        name: "Todo CRUD operations", // name of a tag
      },
    ],
    components: {
      schemas: {
        // id model
        id: {
          type: "string", // data type
          description: "An id of a todo", // desc
          example: "tyVgf", // example of an id
        },
        // todo model
        Todo: {
          type: "object", // data type
          properties: {
            id: {
              type: "string", // data-type
              description: "Todo identification number", // desc
              example: "ytyVgh", // example of an id
            },
            title: {
              type: "string", // data-type
              description: "Todo's title", // desc
              example: "Coding in JavaScript", // example of a title
            },
            completed: {
              type: "boolean", // data type
              description: "The status of the todo", // desc
              example: false, // example of a completed value
            },
          },
        },
        // Todo input model
        TodoInput: {
          type: "object", // data type
          properties: {
            title: {
              type: "string", // data type
              description: "Todo's title", // desc
              example: "Coding in JavaScript", // example of a title
            },
            completed: {
              type: "boolean", // data type
              description: "The status of the todo", // desc
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
          tags: ["Todo CRUD operations"], // operation's tag.
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
        }
      },

      '/todos/{id}':{
        // operation's method
        get: {
          tags: ["Todo CRUD operations"], // operation's tag.
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
        post: {
          tags: ["Todo CRUD operations"], // operation's tag
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

        // operation's method
        put: {
          tags: ["Todo CRUD operations"], // operation's tag
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

        

      }
    }
  };
  