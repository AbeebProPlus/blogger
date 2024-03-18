const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blogger API',
      version: '1.0.0',
      description: 'A blogging app API',
    },
    servers: [
      {
        url: 'http://localhost:8080',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js'],
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
