import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCarComponent } from './choose-car.component';

describe('ChooseTeslaCarComponent', () => {
  let component: ChooseCarComponent;
  let fixture: ComponentFixture<ChooseCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseCarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
