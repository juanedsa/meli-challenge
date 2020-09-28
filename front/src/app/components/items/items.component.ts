import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { Item } from '../../models/items.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent {
  public categories: string[];
  public items: Item[];
  public loading: boolean;

  private readonly ITEMS_TO_SHOW = 4;

  constructor(private searchService: SearchService, private router: Router, private route: ActivatedRoute) {
    this.categories = [];
    this.loading = false;
    this.route.params.subscribe((params) => {
      if (params.query) {
        this.search(params.query);
      }
    });
  }

  public search(query: string): void {
    this.loading = true;

    this.searchService.search(query).subscribe((result) => {
      this.categories = result.categories;
      this.items = result.items.slice(0, this.ITEMS_TO_SHOW);
      this.loading = false;
    });
  }

  public goToDetail(id: string): void {
    this.router.navigate(['/detalle/' + id]);
  }
}
