import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromCsvComponent } from './from-csv.component';

describe('FromCsvComponent', () => {
  let component: FromCsvComponent;
  let fixture: ComponentFixture<FromCsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FromCsvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FromCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
