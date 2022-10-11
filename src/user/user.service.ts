import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

    constructor (@InjectRepository(User) private readonly userRepository: Repository<User>){}

    async create(requestPayload): Promise<User>{
        try{
            const newUser = this.userRepository.save(requestPayload);
            return newUser;
        }catch (error) {
            return error;
        }
    }
    async findOne(email):Promise<User> {
        const user = await this.userRepository.findOne({
            where: {
            email: email
        }})
        return user
    }
}
