import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProfesoresCComponent } from './editar-profesores-c.component';

describe('EditarProfesoresCComponent', () => {
  let component: EditarProfesoresCComponent;
  let fixture: ComponentFixture<EditarProfesoresCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarProfesoresCComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarProfesoresCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
