const { User } = require('../../models')

async function up() {
  await User.create(
    {
      first_name: "Admin",
      last_name: "User",
      date_of_birth: '1999-09-09',
      email: 'admin@admin.com',
      role: 'faculty',
      access: ['admin']
    }
  );
}

async function down() {
  await User.deleteOne({ email: 'admin@admin.com' });
}

module.exports = {
  down,
  up
}