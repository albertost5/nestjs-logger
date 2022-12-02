import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    
    constructor(
        private readonly tasksService: TasksService,
        private readonly logger: Logger
    ) {
        this.logger.log(`${TasksController.name + ' ready!'}`, `${TasksController.name}`);
    }
    
        
    @Get()
    find() {
        this.logger.log(`Called ${this.find.name}`, TasksController.name);
        try {
            return this.tasksService.find();
        } catch (error) {
            throw error;
        }
    }

    @Post()
    create(@Body() createTaskDto: CreateTaskDto) {
        try {
            return this.tasksService.create(createTaskDto);
        } catch (error) {
            throw error;
        }
    }
}
