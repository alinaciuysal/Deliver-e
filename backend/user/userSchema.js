var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: function() {
            return this.type == 'customer';
        }
    }, 
    address: String,
    birthday: Date,
    phone: String,
    maxWeight: {
        type: Number,
        required: function() {
            return this.type == 'deliverer';
        }
    },
    location: {
        type: String,
        required: function() {
            return this.type == 'customer';
        }
    },
    district: {
        type: String,
        required: function() {
            return this.type == 'customer';
        }
    },
    preferredLocation: {
        type: String,
        required: function() {
            return this.type == 'deliverer';
        }
    },
    preferredDistricts: [{
        type: String,
        required: function() {
            return this.type == 'deliverer';
        }
    }],
    type: {
        type: String,
        enum: ['deliverer', 'shop', 'customer'],
        required: true
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop',
        required: function() {
            return this.type == 'shop';
        }
    }

});

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});


userSchema.methods.comparePassword = function(candidatePassword, cb) {
    compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.methods.getUserName = function() {
    return this.name;
};


var User = mongoose.model('User', userSchema);

module.exports = User;

