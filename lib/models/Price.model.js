import mongoose from "mongoose"
import { admins } from "../config/admin.js"

const priceSchema = mongoose.Schema(
    {
        qty: {
            type: Number
        },
        currency: {
            type: String,
            enum: [
                "ether",
                "dai",
                "xDai",
                "usdt",
                "usdc"
            ]
        },
        contractAddress: { //TODO: check if this is necesary or we can get it from chain
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return /^0x[a-fA-F0-9]{40}$/.test(v)
                },
                message: props => `${props.value} is not a valid address!`
            }

        }
    },
    { timestamps: true }
)

module.exports = mongoose.models.User || mongoose.model("User", userSchema)