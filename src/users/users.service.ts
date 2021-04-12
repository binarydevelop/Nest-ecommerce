import { Injectable, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';;
import { userEntity } from './entity/user.entity';
import { UserRepository } from './entity/user.repository';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository) {}

        async getInfo(user){
            return user;
        }

        async findAll(){
            return this.userRepository.findAll();
        }
        
        async findByEmail(email){
            return await this.userRepository.findByEmail(email);
        }

        async deleteAccount(id){
            return this.userRepository.delete(id);
        }

        async findById(id){
            return this.userRepository.findOne(id);
        }

        async findByUsername(username){
            return await this.userRepository.findOne({username: username})
        }


}
