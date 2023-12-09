import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearClasesComponent } from './crear-clases.component';

describe('CrearClasesComponent', () => {
  let component: CrearClasesComponent;
  let fixture: ComponentFixture<CrearClasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearClasesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
