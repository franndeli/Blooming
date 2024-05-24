import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionLegalComponent } from './informacion-legal.component';

describe('InformacionLegalComponent', () => {
  let component: InformacionLegalComponent;
  let fixture: ComponentFixture<InformacionLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformacionLegalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformacionLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
