import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for the project',
    },
    servers: [
      {
        url: '/api',
        description: 'Base API route',
      },
      {
        url: '/',
        description: 'Content API route',
      },
      {
        url: '/',
        description: 'Invoice API route',
      },
      {
        url: '/',
        description: 'User API route',
      },
      {
        url: '/',
        description: 'Transaction API route ',
      },
    ],
  },
  apis: ['./src/routes/**/*.ts'], // Adjusted to match camelCase filenames
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
