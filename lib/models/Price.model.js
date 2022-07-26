import mongoose from "mongoose"
import { admins } from "../config/admin.js"

const priceSchema = mongoose.Schema(
    {
        contractAddress: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return /^0x[a-fA-F0-9]{40}$/.test(v)
                },
                message: props => `${props.value} is not a valid address!`
            }
        },
        challenge: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Challenge"
        }
    },
    { timestamps: true }
)

module.exports = mongoose.models.User || mongoose.model("User", userSchema)