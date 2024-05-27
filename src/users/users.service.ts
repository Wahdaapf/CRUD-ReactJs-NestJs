import { User, UserDocument } from 'src/models/users.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from 'src/dto/users.dto';
import { faker } from '@faker-js/faker';
import { Model } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  Add(body: UserDto) {
    return this.userModel.create(body);
  }

  FindAll() {
    return this.userModel.find();
  }

  FindOne(id: string) {
    return this.userModel.findOne({ _id: id });
  }

  async Update(id: string, body: UserDto) {
    const user = await this.userModel.findOne({ _id: id });
    if(user.filename && user.filename != "") {
      const image = path.join(__dirname, '..', '..', 'images/users', user.filename);
      fs.unlink(image, (err) => {
        if (err) {
          throw new NotFoundException('Could not delete file');
        }
      });
    } 
    return this.userModel.findByIdAndUpdate(
      { _id: id },
      { $set: body },
      { new: true },
    );
  }

  async Delete(id: string) {
    const user = await this.userModel.findOne({ _id: id });
    if(user.filename && user.filename != "") {
      const image = path.join(__dirname, '..', '..', 'images/users', user.filename);
      fs.unlink(image, (err) => {
        if (err) {
          throw new NotFoundException('Could not delete file');
        }
      });
    }
    return this.userModel.findByIdAndDelete({ _id: id });
  }

  Search(key: string) {
    const keyword = key
      ? {
          $or: [
            { fullname: { $regex: key, $options: 'i' } },
            { email: { $regex: key, $options: 'i' } },
          ],
        }
      : {};
    return this.userModel.find(keyword);
  }

  Faker() {
    for (let index = 0; index <= 30; index++) {
      const fakeUser = {
        fullname: faker.name.fullName(),
        email: faker.internet.email(),
        age: 30,
        country: faker.address.city()
      };
      this.userModel.create(fakeUser)
    }
    return;
  }
}
