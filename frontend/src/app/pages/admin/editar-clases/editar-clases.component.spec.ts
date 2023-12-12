import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarClasesComponent } from './editar-clases.component';

describe('EditarClasesComponent', () => {
  let component: EditarClasesComponent;
  let fixture: ComponentFixture<EditarClasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarClasesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
