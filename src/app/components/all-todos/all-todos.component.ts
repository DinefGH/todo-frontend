import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-all-todos',
  templateUrl: './all-todos.component.html',
  styleUrls: ['./all-todos.component.scss']
})
export class AllTodosComponent {
  todos: any = [];
  error = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  async ngOnInit() {
    await this.loadTodos();
  }

  async loadTodos() {
    const url = `${environment.baseUrl}/todos/`;
    try {
      this.todos = await lastValueFrom(this.http.get(url));
      console.log(this.todos);
    } catch (e) {
      this.error = 'Error loading todos!';
      console.error(e);
    }
  }

  addTodo(todoTitle: string) {
    if (!todoTitle.trim()) return; // Prevent empty todos

    const token = localStorage.getItem('token'); // Assuming the token is stored in local storage
    if (!token) {
      console.error('No authentication token found');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}` // Adjust depending on the type of token
    });

    const url = `${environment.baseUrl}todos/`;
    const body = JSON.stringify({ title: todoTitle });

    this.http.post(url, body, { headers }).subscribe({
      next: (response) => {
        console.log('Todo added:', response);
        // Reload todos to include the newly added one...
      },
      error: (error) => {
        console.error('Error adding todo:', error);
        // Handle error...
      }
    });
  }


  deleteTodo(todoId: number) {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    if (!token) {
      console.error('No authentication token found');
      return;
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}` // Ensure this matches the expected token format for your backend
    });
  
    const url = `${environment.baseUrl}todos/${todoId}/`; // Construct the URL for deletion
    this.http.delete(url, { headers }).subscribe({
      next: () => {
        console.log('Todo deleted successfully');
        this.loadTodos(); // Reload the todos list
      },
      error: (error) => {
        console.error('Error deleting todo:', error);
        // Optionally, update the UI to reflect that the deletion was unsuccessful
      }
    });
  }


  async toggleEdit(todo: any) {
    // If the todo does not have an isEditing property, add it dynamically
    if (todo.isEditing === undefined) {
      todo.isEditing = true; // Start editing
    } else {
      todo.isEditing = !todo.isEditing; // Toggle the existing state
    }
  }
  
  async updateTodo(todo: any) {
    if (!todo.title.trim()) return; // Prevent empty todos
  
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found');
      return;
    }
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}` // Adjust depending on the type of token
    });
  
    const url = `${environment.baseUrl}todos/${todo.id}/`;
    const body = JSON.stringify({ title: todo.title, checked: todo.checked });
  
    this.http.put(url, body, { headers }).subscribe({
      next: (response) => {
        console.log('Todo updated:', response);
        todo.isEditing = false; // Exit editing mode
        this.loadTodos(); // Optionally, reload todos to reflect the changes
      },
      error: (error) => {
        console.error('Error updating todo:', error);
        // Handle error...
      }
    });
  }
}