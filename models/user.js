const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    password: {
        type: String
    }
});

// userSchema.pre('save', function (next) {
//     if (!this.isModified('password')) return next();

//     bcrypt.genSalt(10, function(err, salt) {
//         if (err) return next(err);

//         bcrypt.hash(user.password, salt, function (err, hash) {
//             if (err) return next(err);

//             this.password = hash;
//             next();
//         });
//     });

// });

userSchema.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) return callback(err);

        callback(null, isMatch);
    })
}
const User = mongoose.model('User', userSchema);

module.exports = User;
