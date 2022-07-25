import Web3Token from "web3-token"
import { admins } from "../config/admin.js"
import User from "../models/User.model.js"

const authenticate = async (req, res) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        try {
            let token = req.headers.authorization.split("Bearer ")[1];
            console.log({token, headers: req.headers})
            const tokenInfo = await Web3Token.verify(token);
            const { address } = tokenInfo;
            let user = await User.findOne({
                address: String(address).toLowerCase()
            });
            if (!user) {
                user = new User({ address: String(address).toLowerCase() });
                user.isAdmin = admins.includes(String(address).toLowerCase());
            }
            user.lastLogin = new Date();
            await user.save();
            return user;
        } catch (error) {
            console.error(error)
            if (error.name === 'TokenExpiredError')
                throw { status: 418, errors: ['El token ha expirado.'] }
            throw {
                status: 401,
                errors: ["Not authorized, token failed", error]
            }
        }
    }
    throw { status: 404, errors: ["No token, no party."] }
}

const onlyAdmin = async (user) => {
    if (user.isAdmin) {
        return user;
    }
    throw { status: 401, errors: ["Not authorized, not admin."] }
}

const onlySponsor = async (user) => {
    if (user.isSponsor) {
        return user;
    }
    throw { status: 401, errors: ["Not authorized, not sponsor."] }
}

export { authenticate, onlyAdmin, onlySponsor }