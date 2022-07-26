import mongoose from "mongoose"
import { admins } from "../config/admin.js"

const challengeSchema = mongoose.Schema(
    {
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        splitterAddress: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return /^0x[a-fA-F0-9]{40}$/.test(v)
                },
                message: props => `${props.value} is not a valid address!`
            }
        },
        winner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team"
        },
        price: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Price"
        }
    },
    { timestamps: true }
)

module.exports = mongoose.models.Challenge || mongoose.model("Challenge", challengeSchema)