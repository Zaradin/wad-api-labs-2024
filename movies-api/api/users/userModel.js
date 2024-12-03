import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                // Regular expression for password validation
                return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
                    value
                );
            },
            /* eslint-disable */
            message: (props) =>
                `Password must be at least 8 characters long and include at least one letter, one digit, and one special character.`,
        },
    },
});

export default mongoose.model("User", UserSchema);
