import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemaPreguntasComponent } from './sistema-preguntas.component';

describe('SistemaPreguntasComponent', () => {
  let component: SistemaPreguntasComponent;
  let fixture: ComponentFixture<SistemaPreguntasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SistemaPreguntasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SistemaPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
