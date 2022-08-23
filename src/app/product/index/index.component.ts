import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {

  products: Product[] = [];
  constructor(
    public postService: ProductService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.postService.getAll().subscribe((data: Product[])=>{
      this.products = data;
    })  
  }

  viewProduct(id:number){
    this.router.navigateByUrl('product/' + id + '/view');
  }

  editProduct(id:number){
    this.router.navigateByUrl('product/' + id + '/edit');
  }

  deleteProduct(id:number){
    this.postService.delete(id).subscribe(res => {
         this.products = this.products.filter(item => item.product_id !== id);
         console.log('Post deleted successfully!');
    })
  }

}
