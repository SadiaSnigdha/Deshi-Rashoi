const mongoose = require('mongoose');
const userModel = require('./models/userModel.js').default;

require('dotenv/config');

async function updateAdminRole() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const result = await userModel.updateOne(
      { email: 'admin@example.com' },
      { role: 'admin' }
    );
    console.log('User updated:', result);
    process.exit(0);
  } catch(error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

updateAdminRole();
