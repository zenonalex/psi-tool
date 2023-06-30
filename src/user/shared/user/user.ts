import { Document } from "mongoose";
import { UserTypes } from "./utils/user.types";

export class User extends Document {
    name: string;
    email: string;
    password: string;
    userTypes: UserTypes[];
    contactPhone: string;
    contactWhatsapp: string;
    notificationToken: string;
    isFirstAccess: boolean;
    features: number[];
    companyId: string;
    psiId: string;
}
