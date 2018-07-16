import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { finalize } from 'rxjs/internal/operators/finalize';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { FoodService } from './../food/food.service';
import { AddFoodDialogComponent } from './../food/add-food-dialog/add-food-dialog.component';
import { SearchService } from './search.service';
import { Food } from './../shared/entities/food';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  results: Array<Food>;
  searchTerm$ = new Subject<string>();
  @Output() quickAdd = new EventEmitter<string>();
  @Input() addDate: Date;

  constructor(
    private searchService: SearchService,
    private foodService: FoodService,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {
    this.searchService.search(this.searchTerm$)
      .subscribe((results: Array<Food>) => {
        this.results = results;
      });
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      query: ['']
    });
  }

  onSubmit(form: FormGroup) {
    console.log('submitted');
  }

  goToFood(food: Food) {
    this.searchService.selectedFood = food;
    this.router.navigate(['/food', food.name]);
  }

  onAddFood(food: Food, date: Date) {
    this.spinner.show();
    this.foodService.getFood(food.ndbno)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(res => {
        const data = {
          food: res,
          date: date
        };
        const dialogRef = this.dialog.open(AddFoodDialogComponent, { data: data });
        dialogRef.afterClosed().subscribe(() => {
          this.quickAdd.emit();
        });
      });
  }
}
