require('dotenv').config({ silent: true });


console.log('Environment Variables Loaded:', {
  port: process.env.PORT,
  dbConnected: !!process.env.MONGO_URI,
  hasOpenAIKey: !!process.env.OPENAI_API_KEY
});



const app = require('./app');
const config = require('./config/config');

const PORT = config.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});