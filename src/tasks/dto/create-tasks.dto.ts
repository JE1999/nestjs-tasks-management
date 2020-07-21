import { IsNotEmpty } from 'class-validator'

export class CreateTasksDto{
    @IsNotEmpty()
    tittle: string;

    @IsNotEmpty()
    description: string;
}

