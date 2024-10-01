import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from 'src/app/models/task.interface';


@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Desarrollo de Aplicación Web',
      endDate: new Date('2023-12-31'),
      completed: false,
      people: [
        {
          id: 1,
          name: 'Carlos Pérez',
          age: 28,
          skills: ['JavaScript', 'TypeScript', 'Angular', 'Node.js', 'Express']
        },
        {
          id: 2,
          name: 'María López',
          age: 35,
          skills: ['HTML', 'CSS', 'Sass', 'Bootstrap']
        },
      ],
    },
    {
      id: 2,
      title: 'Implementación de Microservicios',
      endDate: new Date('2024-03-15'),
      completed: false,
      people: [
        {
          id: 3,
          name: 'Juan Martínez',
          age: 40,
          skills: ['Java', 'Spring Boot', 'Docker', 'Kubernetes']
        },
      ],
    },
    {
      id: 3,
      title: 'Análisis de Datos',
      endDate: new Date('2024-06-30'),
      completed: true,
      people: [
        {
          id: 5,
          name: 'Luis Fernández',
          age: 45,
          skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib']
        },
        {
          id: 6,
          name: 'Elena Ruiz',
          age: 29,
          skills: ['R', 'Shiny', 'ggplot2']
        },
      ],
    },
  ];

  private generateNextId(elements: Array<any>): number {
    return elements.length > 0 ? Math.max(...elements.map(element => element.id)) + 1 : 1;
  }

  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  addTask(task: Task): Observable<Task> {
    const newTask = { ...task, id: this.generateNextId(this.tasks), completed: false };
    newTask.people = newTask.people.map(person => ({
      ...person,
      id: this.generateNextId(newTask.people)
    }));
    this.tasks = [...this.tasks, newTask];
    return of(newTask);
  }
}
