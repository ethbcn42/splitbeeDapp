import mongoose from "mongoose"

const content = {
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return v.length > 0
            },
            message: "Name in Spanish is required",
        }
    },
    description: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return v.length > 0
            },
            message: "Description in Spanish is required"
        }
    },
    tags: {
        type: String,
        validate: {
            validator: function (v) {
                return v.length > 0 && v.split("|").length > 1
            },
            message: props => `${props.value} is not a valid tag`
        }
    },
}

const eventSchema = mongoose.Schema(
    {
        en: content,
        es: content,
        startsAt: {
            type: Date,
            required: true
        },
        endsAt: {
            type: Date,
            required: true,
            validate: {
                validator: function (v) {
                    return v > this.startsAt
                },
                message: props => `${props.value} is not a valid end date`
            }
        },
        imgs: [{
            type: String,
            validate: {
                validator: function (v) {
                    return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/.test(v) || /^(ipfs?:\/\/[a-zA-Z0-9]+)$/.test(v)
                },
                message: props => `${props.value} is not a valid image url!`
            }
        }],
        relatedCollections: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Collection"
        }]
    },
    { timestamps: true }
)

module.exports = mongoose.models.Event || mongoose.model("Event", eventSchema)