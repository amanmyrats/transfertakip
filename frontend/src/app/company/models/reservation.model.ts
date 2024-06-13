export class Reservation {
    id?: string; 
  
    agency?: string; 
    is_nakit?: boolean;
    amount?: string;
    currency?: string; 
    // currency_obj?: string; 
    agency_comission?: string;
  
    reservation_date?: Date;
    transfer_type?: string;
    car_type?: string; 
    // car_type_obj?: string; 
    transfer_date?: Date;
    transfer_time?: string;
    flight_number?: string;
  
    passenger_name?: string;
    passenger_count?: string;
    note?: string; 
  
    pickup_short?: string;
    pickup_full?: string;
    dest_short?: string;
    dest_full?: string;
  
    is_my_driver?: boolean;
    my_driver?: string; 
    // my_driver_obj?: string; 
    car?: string; 
    // car_obj?: string; 
  
    taseron?: string; 
    // taseron_obj?: string; 
    taseron_hakedis?: string;
    taseron_currency?: string; 
    // taseron_currency_obj?: string; 
    
  }
  
  export const TRANSFER_TYPE_CHOICES = [
    { value: 'ARR', label: 'Arrival' },
    { value: 'DEP', label: 'Departure' },
    { value: 'ARA', label: 'Ara Transfer' },
    { value: 'TUR', label: 'Tur' },
  ];