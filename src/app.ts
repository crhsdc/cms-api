import express from 'express';
import bodyParser from 'body-parser';
import contentRoutes from './routes/contentRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger-config';
import userRoutes from './routes/userRoutes';
import transactionRoutes from './routes/transactionRoutes';
import invoiceRoutes from './routes/invoiceRoutes';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/content', contentRoutes);
app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);
app.use('/invoices', invoiceRoutes);

export default app;
