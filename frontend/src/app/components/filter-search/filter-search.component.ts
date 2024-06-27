import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ReservationService } from '../../company/services/reservation.service';
import { CommonService } from '../../services/common.service';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-filter-search',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule, 
    DropdownModule, 
    InputTextModule, 
    ButtonModule, 
    CalendarModule
  ],
  templateUrl: './filter-search.component.html',
  styleUrl: './filter-search.component.scss'
})
export class FilterSearchComponent implements OnInit{
  @Input() agencies: any[] = [];
  @Input() taserons: any[] = [];
  @Input() drivers: any[] = [];

  @Output() searchEmitter: EventEmitter<any> = new EventEmitter();
  @Output() getAgenciesEmitter: EventEmitter<any> = new EventEmitter();
  @Output() getTaseronsEmitter: EventEmitter<any> = new EventEmitter();
  @Output() getDriversEmitter: EventEmitter<any> = new EventEmitter();

  filterSearchForm: FormGroup;
  event: LazyLoadEvent = {};

  selectedAgency: any;
  selectedTaseron: any;
  selectedDriver: any;

  constructor(
    private fb: FormBuilder, 
    private reservationService: ReservationService, 
    private commonService: CommonService, 
  ){
    this.filterSearchForm = this.fb.group({
      transfer_date: [''],
      agency: [''],
      taseron: [''],
      driver: [''],
      search: ['']
    });
  }
  ngOnInit(): void {
    this.checkActiveUrlQueryParamsAndPatchFormValuesWithQueryParams();
    this.getAgenciesEmitter.emit();
    this.getTaseronsEmitter.emit();
    this.getDriversEmitter.emit();
    }

  search(){
    console.log("Searching...");
    console.log(this.filterSearchForm.value);
    this.event.filters = this.filterSearchForm.value;
    const queryString = this.commonService.buildPaginationParams(this.event)
    this.searchEmitter.emit(queryString);
    this.updateActiveUrlQueryParams(queryString);
  }

  checkActiveUrlQueryParamsAndPatchFormValuesWithQueryParams(){
    const snaptshorUrl = window.location.href.split('?')[1];
    const urlSearchParams = new URLSearchParams(snaptshorUrl);

    urlSearchParams.forEach((value, key) => {
      if (this.filterSearchForm.controls[key]) {
            this.filterSearchForm.controls[key].patchValue(value);
          }
    } );
  }

  clearSearch(){
    this.filterSearchForm.reset();
    this.search();
  }

  updateActiveUrlQueryParams(queryString: string){
    window.history.replaceState({}, '', window.location.pathname + queryString);
  }
}
