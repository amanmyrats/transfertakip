import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private buildCriterias(filters?: any): string {
    const filter: string[] = [];

    for (const attr in filters) {
      if (attr) {
        
        filter.push(attr + ':*' + filters[attr].value + '*');
      }
    }

    return filter.join(',');
  }

  private buildFilter(filters?: any): string {
    let result: string = '';
    for (const attr in filters) {
      if (attr) {
        // console.log(attr + " - " + filters[attr].value);
        result += '&'+attr+'='+filters[attr].value;
      }
    }
    return result;
  }

  private buildFilterFromForm(filters?: any): string {
    let result: string = '';
    // console.log(filters);
    for (const attr in filters) {
      if (attr) {
        // console.log(attr + " - " + filters[attr]);
        if (filters[attr]) {
          result += '&'+attr+'='+filters[attr];
        }
      }
    }
    return result;
  }

  public buildPaginationParams(event: LazyLoadEvent): string {
    if (!event) {
      return '';
    }
    // let filter: string = this.buildFilter(event.filters);
    let filter: string = this.buildFilterFromForm(event.filters);
    const direction = event.sortOrder === 1 ? 'asc' : 'desc';

    // If result of page is 0 then assign 1
    const page: string = ((event?.first || 0) / (event?.rows || 1) + 1 ? (event?.first || 0) / (event?.rows || 1) + 1 : 1).toString();


    return `?page=${page}&pageSize=${event.rows}&sort=${event.sortField}&order=${direction}${filter}`;
  }
}
