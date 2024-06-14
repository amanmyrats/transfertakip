import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperasyonComponent } from './operasyon.component';

describe('OperasyonComponent', () => {
  let component: OperasyonComponent;
  let fixture: ComponentFixture<OperasyonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperasyonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperasyonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
