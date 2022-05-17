const User = require('../models/user');

async function up() {
  await User.create(
    {
      first_name: "Admin",
      last_name: "User",
      date_of_birth: '1999-09-09',
      email: 'admin@admin.com',
      role: 'faculty',
      access: ['admin']
    },
    function (e) {
      console.log("UP");
      if (e) {
        throw e;
      }
    }
  )
}

async function down() {
  await User.deleteOne(
    { email: 'admin@admin.com' },
    function (e) {
      console.log("DOWN");
      if (e) {
        throw e;
      }
    }
  )
}

module.exports = { up, down };
