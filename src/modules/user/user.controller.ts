import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':authId')
  async executeGetOneByAuthId(
    @Param('authId') authId: string,
  ): Promise<UserEntity> {
    return await this.userService.getByAuthId(authId);
  }

  @Post()
  async executeCreateUser(
    @Body() CreateUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    return await this.userService.create(CreateUserDto);
  }
}
