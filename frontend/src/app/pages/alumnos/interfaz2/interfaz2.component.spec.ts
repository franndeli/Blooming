import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Interfaz2Component } from './interfaz2.component';

describe('Interfaz2Component', () => {
  let component: Interfaz2Component;
  let fixture: ComponentFixture<Interfaz2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Interfaz2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Interfaz2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
