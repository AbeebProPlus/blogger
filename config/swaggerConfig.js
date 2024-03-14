const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blogger Api',
      version: '1.0.0',
      description: 'A blogging app API',
    },
    servers: [
      {
        url: 'http://localhost:8080',
      },
    ],
  },
  apis: ['./routes/*.js'],
};


const specs = swaggerJsdoc(options);

module.exports = specs;
