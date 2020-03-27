import {
  Component,
  OnInit
} from '@angular/core';
import {Filter} from '../filter';
import {Category} from '../../api/category/category';
import {FilterService} from '../filter.service';
import {CategoryService} from '../../api/category/category.service';

@Component({
  selector: 'app-filter-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class FilterPopoverComponent implements OnInit {

  readonly filter: Filter;
  public categories: Category[];

  /* Passing CSS to the popover. */
  public categoryAlertOptions: any = {
    cssClass: "category-alert"
  };

  constructor(
    private filterService: FilterService,
    private categoryService: CategoryService,
  ) {
    this.filter = filterService.getCurrentFilter();
    this.categories = this.categoryService.getAllCategories();
  }

  ngOnInit() {}

  categoryHasChanged(event: CustomEvent) {
    console.log(event);
    this.filter.categoriesToIncludeById = event.detail.value;
    this.filter.isEmpty = this.checkIfFilterEmpty();
    this.filterService.changeFilter(this.filter);
  }

  checkIfFilterEmpty(): boolean {
    return (
      this.filter.categoriesToIncludeById.length === 0 &&
      this.filter.outingToInclude != null
    );
  }

}
