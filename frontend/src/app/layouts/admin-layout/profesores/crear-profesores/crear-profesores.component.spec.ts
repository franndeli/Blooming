import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProfesoresComponent } from './crear-profesores.component';

describe('CrearProfesoresComponent', () => {
  let component: CrearProfesoresComponent;
  let fixture: ComponentFixture<CrearProfesoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearProfesoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
