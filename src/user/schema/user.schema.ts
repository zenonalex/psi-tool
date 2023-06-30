import * as mongoose from 'mongoose';
import { UserTypes } from '../shared/user/utils/user.types';

const userTypeSchema = new mongoose.Schema({
    value: { type: String, enum: UserTypes, default: UserTypes.CUSTOMER }
});

export const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    userTypes: [{ type: String, ref: userTypeSchema }],
    contactPhone: String,
    contactWhatsapp: String,
    notificationToken: String,
    isFirstAccess: Boolean,
    features: [Number],
    companyId: String,
    psiId: String,
}, {
    timestamps: false,
    versionKey: false,
    id: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
            delete ret.__v;
            delete ret.password;
        }
    }
})