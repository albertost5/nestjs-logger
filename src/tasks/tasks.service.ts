import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {

    find() {
        return 'All tasks';
    }

    create(createTaskDto: CreateTaskDto) {
        return 'New task created';
    }

}
