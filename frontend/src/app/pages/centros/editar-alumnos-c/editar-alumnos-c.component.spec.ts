import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAlumnosCComponent } from './editar-alumnos-c.component';

describe('EditarAlumnosCComponent', () => {
  let component: EditarAlumnosCComponent;
  let fixture: ComponentFixture<EditarAlumnosCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarAlumnosCComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarAlumnosCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
