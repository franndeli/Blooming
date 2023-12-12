import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAlumnosComponent } from './editar-alumnos.component';

describe('EditarAlumnosComponent', () => {
  let component: EditarAlumnosComponent;
  let fixture: ComponentFixture<EditarAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarAlumnosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
