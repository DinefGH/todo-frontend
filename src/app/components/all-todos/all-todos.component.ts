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
}