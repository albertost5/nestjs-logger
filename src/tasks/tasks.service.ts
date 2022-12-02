import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {

    find() {
        throw new BadRequestException('badrequest');
    }

    create(createTaskDto: CreateTaskDto) {
        throw new NotFoundException('notfound');
    }

}
