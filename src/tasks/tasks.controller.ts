import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks, TaskStatus } from './tasks.model';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getTasks(@Query() filterDto : GetTasksFilterDto) : Tasks[] {
        if(Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilter(filterDto);
        }else {
            return this.tasksService.getAllTasks();
        }
    }

    @Get('/:id')
    getTasksById(@Param('id') id: string) : Tasks {
        return this.tasksService.getTasksById(id)
    }

    @Post()
    createTasks(@Body() createTasksDto : CreateTasksDto) : Tasks {
        return this.tasksService.createTasks(createTasksDto);
    }

    @Delete('/:id')
    deleteTasksById(@Param('id') id: string) : void {
        this.tasksService.deleteTasksById(id)
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus
    ) : Tasks {
        return this.tasksService.updateTaskStatus(id, status)
    }

}
