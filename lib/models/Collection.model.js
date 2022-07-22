import mongoose from "mongoose"
const content = {
    name: {
        type: String,
        unique: true,
        validate: {
            validator: function (v) {
                return v.length > 0
            }
        }
    },
    description: {
        type: String,
        validate: {
            validator: function (v) {
                return v.length > 0
            }
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

const CollectionSchema = mongoose.Schema(
    {
        es: content,
        en: content,
        isInLandingPage: {
            type: Boolean,
            default: false
        },
        isPublic: {
            type: Boolean,
            default: false
        },
        network: {
            type: String,
            required: true,
            enum: ["Ethereum", "Polygon"]
        },
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
        subgraph: {
            type: String,
            validate: {
                validator: function (v) {
                    return /^https?:\/\/(.+?\.)?thegraph\.com(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?/.test(v)
                },
                message: props => `${props.value} is not a valid subgraph url!`
            }
        },
        external_url:{
            type: String,
            validate: {
                validator: function (v) {
                    return /^https?:\/\/(.+?\.)?(.+?)/.test(v)
                },
                message: props => `${props.value} is not a valid external link!`
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
        }],
        // featuredData: [{
        //     link: String,
        //     img: String,
        // }]
    },
    { timestamps: true }
)

module.exports = mongoose.models.Collection || mongoose.model("Collection", CollectionSchema)
