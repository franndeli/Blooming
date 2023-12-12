import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerClasesComponent } from './ver-clases.component';

describe('VerClasesComponent', () => {
  let component: VerClasesComponent;
  let fixture: ComponentFixture<VerClasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerClasesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
