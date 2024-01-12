import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversacionComponent } from './conversacion.component';

describe('ConversacionComponent', () => {
  let component: ConversacionComponent;
  let fixture: ComponentFixture<ConversacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConversacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConversacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
