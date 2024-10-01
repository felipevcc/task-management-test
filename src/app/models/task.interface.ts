import { Person } from './person.interface';

export interface Task {
  id: number;
  title: string;
  endDate: Date;
  completed: boolean;
  people: Person[];
}
