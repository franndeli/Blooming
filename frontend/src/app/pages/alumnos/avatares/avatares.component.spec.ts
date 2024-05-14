import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvataresComponent } from './avatares.component';

describe('AvataresComponent', () => {
  let component: AvataresComponent;
  let fixture: ComponentFixture<AvataresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvataresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvataresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
