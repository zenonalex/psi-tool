import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/user';
import { Model } from 'mongoose';
import { UserTypes } from './utils/user.types';

@Injectable()
export class UserService {
    constructor(@InjectModel("User") private readonly userModel: Model<User>) { }

    async createNewUser(user: User) {
        const newUser = new this.userModel(user);

        return await newUser.save();
    }

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async getCustomers(companyId: string, psiId: string): Promise<User[]> {
        const users = await this.getAllUsers();
        const hasPsiIdFilter = psiId != undefined;

        const filteredUsers = hasPsiIdFilter
            ? users.filter(
                user => user.companyId == companyId
                    && user.psiId == psiId
                    && user.userTypes.includes(UserTypes.CUSTOMER)
            )
            : users.filter(
                user => user.companyId == companyId
                    && user.userTypes.includes(UserTypes.CUSTOMER)
            );

        return filteredUsers;
    }

    async getPsy(companyId: string): Promise<User[]> {
        const users = await this.getAllUsers();

        return users.filter(user => {
            return user.companyId == companyId && user.userTypes.includes(UserTypes.PSI)
        }
        );
    }

    async getUserByEmail(email: string): Promise<User | undefined> {
        const users = await this.getAllUsers();

        return users.find(user => user.email == email);
    }
}
