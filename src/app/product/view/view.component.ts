import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {

  product_id!: number;
  product: Product = new Product();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.product_id = this.route.snapshot.params['productId'];
         
    this.productService.find(this.product_id).subscribe((data: Product)=>{
      this.product = data;
    });
  }

}
