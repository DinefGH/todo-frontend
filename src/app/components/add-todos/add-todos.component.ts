import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from 'src/environments/environment'; // Adjust the import path as needed

interface TodoItem {
  title: string;
  checked: boolean;
}

@Component({
    selector: 'app-add-todos',
    templateUrl: './add-todos.component.html',
    styleUrls: ['./add-todos.component.scss']
  })
export class AddTodosComponent {
  
  todos: any = [];
  error = '';
  constructor(private http: HttpClient) {}

  addTodo(todoTitle: string) {
    if (!todoTitle.trim()) return; // Prevent empty todos

    const url = `${environment.baseUrl}/addtodo/`; // Ensure this URL matches your Django endpoint
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ title: todoTitle });

    this.http.post(url, body, { headers }).subscribe({
      next: (response) => {
        console.log('Todo added:', response);
        // Optionally clear the input field or handle success (e.g., display a message)
      },
      error: (error) => {
        console.error('Error adding todo:', error);
        // Optionally handle the error (e.g., display an error message)
      }
    });
  }
}