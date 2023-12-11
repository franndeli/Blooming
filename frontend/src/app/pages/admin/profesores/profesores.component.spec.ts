import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesoresComponent } from './profesores.component';

describe('ProfesoresComponent', () => {
  let component: ProfesoresComponent;
  let fixture: ComponentFixture<ProfesoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfesoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
