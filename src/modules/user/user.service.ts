import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(CreateUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(CreateUserDto);
    return await this.userRepository.save(user);
  }

  async getByAuthId(authId: string): Promise<UserEntity> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.authId', { authId })
      .getOne();
  }
}
