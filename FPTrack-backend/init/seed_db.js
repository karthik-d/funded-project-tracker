var User = require('../models/user.js');

/* create an admin user */

var admin_user = {
    first_name: "Admin",
    last_name: "User",
    date_of_birth: '1999-09-09',
    email: 'admin@admin.com',
    role: 'faculty',
    access: ['admin']
}

User.create(admin_user, function (e) {
    if (e) {
        throw e;
    }
});