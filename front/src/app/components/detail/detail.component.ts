import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailService } from '../../services/detail.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public description: string;
  public picture: string;
  public condition: string;
  public soldQuantity: number;
  public title: string;
  public price: number;
  public currency: string;
  public loading: boolean;

  constructor(private router: Router, private detailService: DetailService, private route: ActivatedRoute) {
    this.description = '';
    this.picture = '';
    this.condition = '';
    this.soldQuantity = 0;
    this.title = '';
    this.price = 0;
    this.currency = '';
    this.loading = true;
  }

  public ngOnInit(): void {
    this.getParams();
  }

  get productCondition(): string {
    return this.condition === 'used' ? 'Usado' : 'Nuevo';
  }

  public search(query: string): void {
    this.router.navigate(['/' + query]);
  }

  private getParams(): void {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.getDetail(params.id);
      }
    });
  }

  private getDetail(id: string): void {
    this.detailService.detail(id).subscribe((detail) => {
      this.loading = false;
      this.description = detail.description;
      this.picture = detail.item.picture;
      this.condition = detail.item.condition;
      this.soldQuantity = detail.item.sold_quantity;
      this.title = detail.item.title;
      this.price = detail.item.price.amount;
      this.currency = detail.item.price.currency;
    });
  }
}
