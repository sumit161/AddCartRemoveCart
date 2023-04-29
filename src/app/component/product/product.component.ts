import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public productlist: any;
  filterCategory: any;
  searchkey: string = '';
  constructor(private api: ApiService, private _cartService: CartService) {}

  ngOnInit(): void {
    this.api.getProduct().subscribe((res) => {
      this.productlist = res;
      this.filterCategory = res;
      console.log(this.productlist);
      this.productlist.forEach((ele: any) => {
        if (
          ele.category === "men's clothing" ||
          ele.category === "women's clothing"
        ) {
          ele.category = 'fashion';
        }
        Object.assign(ele, { quantity: 1, total: ele.price });
      });
      console.log(this.productlist);
    });

    this._cartService.search.subscribe((val: any) => {
      this.searchkey = val;
    });
  }
  addtoCart(item: any) {
    this._cartService.addToCart(item);
  }
  filter(catagory: string) {
    this.filterCategory = this.productlist.filter((ele: any) => {
      if (ele.category === catagory || catagory === '') {
        return ele
      }
    });
  }
}
