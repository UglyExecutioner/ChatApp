// utils
import pkg from 'express-validator';
const { check, validationResult } = pkg;
// models
import UserModel, { USER_TYPES } from '../models/User.js';

export default {
    onGetAllUsers: async (req, res) => { 
        try {
            const users = await UserModel.find();
            return res.status(200).json({success:true,result:users});
        } catch (error) {
            return res.status(500).json({success:false,errors:error});
        }
    },
    onGetUserById: async (req, res) => { 
        try {
            const user = await UserModel.findById({_id: req.params.id});
            if(!user){
                return res.status(500).json({success:false,errors:'No User'})
            }
            return res.status(200).json({success:true,result:user});
        } catch (error) {
            return res.status(500).json({success: false,errors:error});
        }
    },
    onCreateUser: async (req, res) => { 
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors:errors.array()})
            }

            const { firstName,lastName,type } = req.body;
            const user = await UserModel.create({firstName,lastName,type});
            return res.status(200).json({success:true,result:user});
        } catch (error) {
            return res.status(500).json({success:false,errors:error});
        }
    },
    onDeleteUserById: async (req, res) => { 
        try {
            const deletedUser = await UserModel.remove({_id:req.params.id});
            return res.status(200).json({success:true,result:{msg:'User Removed!'}});
        } catch (error) {
            return res.status(500).json({success:false,errors:error})
        }
    },
  }