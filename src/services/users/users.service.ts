import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../controllers/users/dto/create-user.dto';
import { UpdateUserDto } from '../../controllers/users/dto/update-user.dto';
import { User } from '../../controllers/users/entities/user.entity';
import { EntityNotFoundError } from 'src/errors/entity-not-found-error';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@mail.com',
    },
  ];

  create(createUserDto: CreateUserDto) {
    const lastId = this.users[this.users.length - 1]?.id || 0;
    const id = lastId + 1;
    const newUser: User = {
      id,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new EntityNotFoundError(`User with id ${id} not found`);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    const updatedUser = {
      ...user,
      ...updateUserDto,
    };
    const index = this.users.indexOf(user);
    this.users[index] = updatedUser;
    return updatedUser;
  }

  remove(id: number) {
    const user = this.findOne(id);
    if (!user) return { message: `User with id ${id} not found` };
    const index = this.users.indexOf(user);
    this.users.splice(index, 1);
  }
}
