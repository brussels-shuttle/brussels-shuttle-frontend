import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationApproachComponent } from './reservation-approach.component';

describe('ReservationApproachComponent', () => {
  let component: ReservationApproachComponent;
  let fixture: ComponentFixture<ReservationApproachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationApproachComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservationApproachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
