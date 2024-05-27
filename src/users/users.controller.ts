import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from 'src/dto/users.dto';
import { fileUpload } from 'src/util/file-upload';

@Controller('users')
export class UsersController {
    constructor(private readonly service: UsersService){};

    @Post()
    @UseInterceptors(fileUpload('./images/users'))
    Add(@Body() body: UserDto, @UploadedFile() file: Express.Multer.File) {
        if (file) {
            body.filename = file.filename
        }
        return this.service.Add(body)
    }

    @Get()
    FindAll() {
        return this.service.FindAll()
    }

    @Get("/:id")
    FindOne(@Param('id') id: string) {
        return this.service.FindOne(id)
    }

    @Put("/:id")
    @UseInterceptors(fileUpload('./images/users'))
    Update(@Param('id') id: string, @Body() body: UserDto, @UploadedFile() file: Express.Multer.File) {
        if (file) {
            body.filename = file.filename
        }
        return this.service.Update(id, body)
    }

    @Delete("/:id")
    Delete(@Param('id') id: string) {
        return this.service.Delete(id)
    }

    @Post('/search')
    Search(@Query('key') key) {
        return this.service.Search(key)
    }

    @Post('/faker')
    Faker() {
        return this.service.Faker()
    }
}
