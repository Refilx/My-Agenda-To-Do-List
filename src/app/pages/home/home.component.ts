import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  taskRegistrationObj: any = {
    titulo: '',
    descricao: '',
    data: '',
    hora: '',
    prioridade: ''
  };

  tasks: Array<any> = [];

  isEditing: boolean = false;
  editingIndex: number | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadTasks();
    }
  }

  handleSubmit(): void {
    if (this.isEditing && this.editingIndex !== null) {
      // Update existing task
      this.tasks[this.editingIndex] = { ...this.taskRegistrationObj };
      this.isEditing = false;
      this.editingIndex = null;
    } else {
      // Add new task
      this.tasks.push({ ...this.taskRegistrationObj, completed: false });
    }
    if (isPlatformBrowser(this.platformId)) {
      this.saveTasks();
    }
    this.resetForm();
  }

  editTask(index: number): void {
    this.taskRegistrationObj = { ...this.tasks[index] };
    this.isEditing = true;
    this.editingIndex = index;
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
    if (isPlatformBrowser(this.platformId)) {
      this.saveTasks();
    }
  }


  toggleCompletion(index: number): void {

    this.tasks[index].completed = !this.tasks[index].completed;

    /*
    if (isPlatformBrowser(this.platformId)) {
      this.saveTasks();
    }
      */
  }


  resetForm(): void {
    this.taskRegistrationObj = {
      titulo: '',
      descricao: '',
      data: '',
      hora: '',
      prioridade: ''
    };
  }

  saveTasks(): void {
    try {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      }
    } catch (e) {
      console.error('Error saving tasks to localStorage', e);
    }
  }

  loadTasks(): void {
    try {
      if (isPlatformBrowser(this.platformId)) {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
          this.tasks = JSON.parse(savedTasks);
        }
      }
    } catch (e) {
      console.error('Error loading tasks from localStorage', e);
    }
  }
}

