import mongoose from "mongoose"
import { admins } from "../config/admin.js"

const userSchema = mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return /^0x[a-fA-F0-9]{40}$/.test(v)
                },
                message: props => `${props.value} is not a valid address!`
            }
        },
        lastLogin: {
            type: Date,
            default: Date.now,
        },
        img: {
            type: String
        },
    },
    { timestamps: true }
)

module.exports = mongoose.models.User || mongoose.model("User", userSchema)