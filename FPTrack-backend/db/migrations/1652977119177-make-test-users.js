const User = require('../../models').User;

async function up() {
  // Write migration here
  await User.create(
    {
      first_name: "Ben",
      last_name: "Yeates",
      date_of_birth: '1999-09-09',
      email: 'ben@gmail.com',
      role: 'student',
      access: ['user']
    }
  );

  await User.create(
    {
      first_name: "Claire",
      last_name: "Xiao",
      date_of_birth: '1999-09-09',
      email: 'claire@gmail.com',
      role: 'student',
      access: ['user']
    }
  );

  await User.create(
    {
      first_name: "Derek",
      last_name: "Woakes",
      date_of_birth: '1999-09-09',
      email: 'derek@gmail.com',
      role: 'student',
      access: ['user']
    }
  );

  await User.create(
    {
      first_name: "Erin",
      last_name: "Vincent",
      date_of_birth: '1999-09-09',
      email: 'erin@gmail.com',
      role: 'student',
      access: ['user']
    }
  );
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
  await User.deleteOne({ email: 'ben@gmail.com' });
  await User.deleteOne({ email: 'claire@gmail.com' });
  await User.deleteOne({ email: 'derek@gmail.com' });
  await User.deleteOne({ email: 'erin@gmail.com' });
}

module.exports = { up, down };
