import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProfesoresCComponent } from './crear-profesores-c.component';

describe('CrearProfesoresCComponent', () => {
  let component: CrearProfesoresCComponent;
  let fixture: ComponentFixture<CrearProfesoresCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearProfesoresCComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearProfesoresCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
