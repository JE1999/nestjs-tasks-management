import { Injectable, NotFoundException } from '@nestjs/common';
import { Tasks, TaskStatus } from './tasks.model';
import { v1 as uuid } from 'uuid';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Tasks[] = [];

    getAllTasks() : Tasks[] {
        return this.tasks;
    }

    getTasksWithFilter(filterDto : GetTasksFilterDto) : Tasks[] {
        const { status, search } = filterDto;
        
        let tasks = this.getAllTasks();

        if(status){
            tasks = tasks.filter(task => task.status === status)
        }

        if(search){
            tasks = tasks.filter(task => 
                task.tittle.includes(search) || 
                task.description.includes(search)
            )
        }

        return tasks
    }

    getTasksById(id: string) : Tasks {
        const found = this.tasks.find(task => task.id === id);
        
        if(!found){
            throw new NotFoundException(`The id: ${id} can't be found`);
        }

        return found;
    }

    createTasks(createTasksDto : CreateTasksDto) : Tasks {
        const { tittle, description } = createTasksDto;

        const tasks: Tasks = {
            id: uuid(),
            tittle,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(tasks);
        return tasks;
    }

    deleteTasksById(id: string) : void {
        const found = this.getTasksById(id)
        this.tasks = this.tasks.filter(task => task.id !== found.id)
    }

    updateTaskStatus(id: string, status: TaskStatus) : Tasks {
        const task = this.getTasksById(id)
        task.status = status
        return task
    }

}
