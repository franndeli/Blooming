import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosAlumnosComponent } from './todos-alumnos.component';

describe('TodosAlumnosComponent', () => {
  let component: TodosAlumnosComponent;
  let fixture: ComponentFixture<TodosAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodosAlumnosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodosAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
