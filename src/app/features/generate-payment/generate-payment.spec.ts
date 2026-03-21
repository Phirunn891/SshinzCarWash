import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePayment } from './generate-payment';

describe('GeneratePayment', () => {
  let component: GeneratePayment;
  let fixture: ComponentFixture<GeneratePayment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneratePayment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratePayment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
