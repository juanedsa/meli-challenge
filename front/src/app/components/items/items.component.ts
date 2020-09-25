import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent {
  public categories: string[];
  public items: [];
  public loading: boolean;

  private readonly ITEMS_TO_SHOW = 4;

  constructor(private searchService: SearchService) {
    this.categories = [];
    this.loading = false;
  }

  public search(query: string): void {
    this.loading = true;
    this.searchService.search(query).subscribe((result) => {
      this.categories = result.categories;
      this.items = result.items.slice(0, this.ITEMS_TO_SHOW);
      this.loading = false;
    });
  }
}
