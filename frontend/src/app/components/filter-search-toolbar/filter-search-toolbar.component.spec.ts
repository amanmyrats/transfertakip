import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSearchToolbarComponent } from './filter-search-toolbar.component';

describe('FilterSearchToolbarComponent', () => {
  let component: FilterSearchToolbarComponent;
  let fixture: ComponentFixture<FilterSearchToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterSearchToolbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterSearchToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
