import sequelize from './config/db.js';
import User from './models/userModel.js';

async function updateRole() {
  try {
    const user = await User.findOne({ where: { email: 'admin@example.com' } });
    if (user) {
      await user.update({ role: 'admin' });
      console.log('Admin role updated successfully');
    }
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

updateRole();
