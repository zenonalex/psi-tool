import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/user';
import { Model } from 'mongoose';

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

    async getUserByEmail(email: string): Promise<User | undefined> {
        const users = await this.getAllUsers();
        
        return users.find(user => user.email == email);
    }
}
