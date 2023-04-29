import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public product: any = [];
  public grandTotal!: number;
  constructor(private _cartservice: CartService) {}

  ngOnInit(): void {
    this._cartservice.getProduct().subscribe((res) => {
      this.product = res;
      this.grandTotal = this._cartservice.getTotalPrice();
    });
  }
  removeItem(item: any) {
    this._cartservice.removeCartItem(item);
  }
  emptyCart() {
    this._cartservice.removeAllCart();
  }
}
