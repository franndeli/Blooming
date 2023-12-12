import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProfesoresComponent } from './editar-profesores.component';

describe('EditarProfesoresComponent', () => {
  let component: EditarProfesoresComponent;
  let fixture: ComponentFixture<EditarProfesoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarProfesoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
