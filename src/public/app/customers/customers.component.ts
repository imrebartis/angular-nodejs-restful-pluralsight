import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataFilterService } from '../core/data-filter.service';
import { DataService } from '../core/data.service';
import { ICustomer, IOrder, IPagedResults } from '../shared/interfaces';

@Component({ 
  moduleId: module.id,
  selector: 'customers', 
  templateUrl: './customers.component.html',
  // don't forget to add providers here:
  providers: [DataService]
})
export class CustomersComponent implements OnInit {

  title: string;
  customers: ICustomer[] = []; // raw data
  filteredCustomers: ICustomer[] = []; // either raw data or filtered data depending on user interaction

  totalRecords: number = 0;
  pageSize: number = 10;

  constructor(private router: Router, 
              private dataService: DataService,
              private dataFilter: DataFilterService) { }
  
  ngOnInit() {
    this.title = 'Customers';
    this.getCustomers();
  }

  filterChanged(filterText: string) {
    if (filterText && this.customers) {
        let props = ['firstName', 'lastName', 'address', 'city', 'state.name', 'orderTotal'];
        this.filteredCustomers = this.dataFilter.filter(this.customers, props, filterText);
    }
    else {
      this.filteredCustomers = this.customers;
    }
  }


  getCustomers() {
    this.dataService.getCustomers()
      .subscribe((customers: ICustomer[]) => {
        this.customers = this.filteredCustomers = customers;
      },
      (err: any) => console.log(err),
      () => console.log('getCustomers() retrieved customers')  
    )
  }

}