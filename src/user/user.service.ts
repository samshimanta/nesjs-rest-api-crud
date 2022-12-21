import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  private users: User[] = [];
  //sequential id for user
  private idSeq:number = 0;

  create(createUserDto: CreateUserDto) {
    this.users.push({
      ...createUserDto,
      id: this.idSeq++,
    })
    return this.users.at(-1);
  }

  findAll():User[] {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find( (user)=>user.id === id ) ;
  }

  update(id: number, updateUserDto: UpdateUserDto):User {
    const index = this.users.findIndex((user)=> user.id=== id);
    if (index=== -1) return null;
    this.users[index]={
      ...this.users[index],
      ...updateUserDto
    } 
    return this.users[index];
  }

  remove(id: number) :User {
    const index = this.users.findIndex((user)=> user.id=== id);
    if (index=== -1) return null;
    const user =  this.users[index];
    this.users.splice(index,1)
    return user;
  }
}
