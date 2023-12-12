import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerProfesoresCComponent } from './ver-profesores-c.component';

describe('VerProfesoresCComponent', () => {
  let component: VerProfesoresCComponent;
  let fixture: ComponentFixture<VerProfesoresCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerProfesoresCComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerProfesoresCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
