import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodosComponent } from './add-todos.component';

describe('AddTodosComponent', () => {
  let component: AddTodosComponent;
  let fixture: ComponentFixture<AddTodosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTodosComponent]
    });
    fixture = TestBed.createComponent(AddTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
