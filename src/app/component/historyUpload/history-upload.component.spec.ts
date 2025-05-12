import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryUploadComponent } from './history-upload.component';

describe('HistoryUploadComponent', () => {
  let component: HistoryUploadComponent;
  let fixture: ComponentFixture<HistoryUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
