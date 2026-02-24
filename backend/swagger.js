const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Food Order App API',
      version: '1.0.0',
      description: 'API dokumentacija za Food Order aplikaciju - sistem za poručivanje hrane',
      contact: {
        name: 'Mihailo Savić',
        email: 'misa.savic.2000@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            id: {
              type: 'string',
              description: 'Auto-generated user ID',
            },
            name: {
              type: 'string',
              description: 'User full name',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Hashed password (bcrypt)',
            },
            type: {
              type: 'string',
              enum: ['admin', 'loyalty', 'regular'],
              description: 'User type/role',
            },
          },
        },
        Meal: {
          type: 'object',
          required: ['name', 'description', 'price', 'image'],
          properties: {
            id: {
              type: 'string',
              description: 'Auto-generated meal ID',
            },
            name: {
              type: 'string',
              description: 'Meal name',
            },
            description: {
              type: 'string',
              description: 'Meal description',
            },
            price: {
              type: 'string',
              description: 'Meal price (formatted as string)',
            },
            image: {
              type: 'string',
              description: 'Meal image path',
            },
          },
        },
        Order: {
          type: 'object',
          required: ['customer', 'items'],
          properties: {
            id: {
              type: 'string',
              description: 'Auto-generated order ID',
            },
            customer: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                email: { type: 'string' },
                street: { type: 'string' },
                'postal-code': { type: 'string' },
                city: { type: 'string' },
              },
            },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  quantity: { type: 'integer' },
                  price: { type: 'string' },
                },
              },
            },
            totalPrice: {
              type: 'string',
              description: 'Total order price',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js', './controllers/*.js'], // Putanje do fajlova sa komentarima
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };