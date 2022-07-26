import mongoose from "mongoose"


const teamSchema = mongoose.Schema(
    {
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        members: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        //VISION: now the cause is always the same, in the future the team can choose it
        // cause: {
        //     type: String,
        //     required: true,
        //     validate: {
        //         validator: function (v) {
        //             return /^0x[a-fA-F0-9]{40}$/.test(v)
        //         },
        //         message: props => `${props.value} is not a valid address!`
        //     }
        // },
        percent: {
            //TODO: Definir cuanto es el minimo y el máximo.
            // De momento minimo 1% máximo 20%
            type: Number,
            min: 1,
            max: 20
        }
    },
    { timestamps: true }
)

module.exports = mongoose.models.Team || mongoose.model("Team", teamSchema)