import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaseronListComponent } from './taseron-list.component';

describe('TaseronListComponent', () => {
  let component: TaseronListComponent;
  let fixture: ComponentFixture<TaseronListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaseronListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaseronListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
