import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AyudaAmbitosComponent } from './ayuda-ambitos.component';

describe('AyudaAmbitosComponent', () => {
  let component: AyudaAmbitosComponent;
  let fixture: ComponentFixture<AyudaAmbitosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AyudaAmbitosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AyudaAmbitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
