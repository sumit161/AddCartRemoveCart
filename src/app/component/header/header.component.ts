import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public totalItem: number = 0;
  public SearchTerm :string ='';
  constructor(private _cartService: CartService) {}

  ngOnInit(): void {
    this._cartService.getProduct().subscribe((res) => {
      this.totalItem = res.length;
    });
  }
  search(event:any){
    this.SearchTerm= (event.target as HTMLInputElement).value;
    console.log(this.SearchTerm);
    this._cartService.search.next(this.SearchTerm)
  }
}
