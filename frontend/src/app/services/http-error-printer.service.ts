import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorPrinterService {

  constructor(
    private messageService: MessageService, 
    // private translateService?: TranslateService
  ) {} // Inject messageService and optional translateService

  public printHttpError(err: any): void {
    console.log("HttpErrorPrinterService.printHttpError()");
    console.log(err);
    this.messageService.clear();
    if (err.error) {
      for (const [key, value] of Object.entries(err.error)) {
        // const translatedKey = this.translateKey(key); // Optional translation
        // const translatedValue = this.translateValue(value); // Optional translation
        this.messageService.add({ severity: 'error', summary: key, detail: value as string });
      }
    } else {
      console.error('Beklenmedik hata:', err);
      this.messageService.add({ severity: 'error', summary: 'Unexpected Error', detail: 'An unexpected error occurred.' }); // Default error message
    }
  }

  // // Optional translation methods (if using @ngx-translate/core):
  // private translateKey(key: string): string {
  //   const translationKey = `http_error.${key}`; // Customize translation key prefix
  //   return this.translateService.instant(translationKey, { defaultValue: key });
  // }

  // private translateValue(value: string): string {
  //   // Implement translation logic for values if needed
  //   return value; // No translation by default
  // }
}