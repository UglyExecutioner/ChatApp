import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

const SECRET_KEY = 'Chat_application';
export const decode = (req, res, next) => {
    try {
        if(!req.headers['authorization']){
            return res.status(400).json({ success: false, message: 'No access token provided' });
        }
        const accessToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(accessToken, SECRET_KEY);
        req.userId = decoded.userId;
        req.userType = decoded.userType;
        return next();
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

export const encode = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await UserModel.findById({_id:userId});
        if(!user){
            return res.status(400).json({success:false,result:'No such user exists'});
        }
        const payload = {
            userId: user._id,
            userType : user.type
        };
        const authToken = jwt.sign(payload, SECRET_KEY);
        console.log("AUTH", authToken);
        req.authToken = authToken;
        next();
    } catch (error) {
        return res.status(400).json({ success: false, message: error.error });
    }
}