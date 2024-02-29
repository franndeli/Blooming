import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Interfaz3Component } from './interfaz3.component';

describe('Interfaz3Component', () => {
  let component: Interfaz3Component;
  let fixture: ComponentFixture<Interfaz3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Interfaz3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Interfaz3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
