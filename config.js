require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/mindease',
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};