import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {

  product_id!: number;
  product: Product = new Product();
  form!: FormGroup;

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.product_id = this.route.snapshot.params['productId'];
    this.productService.find(this.product_id).subscribe((data: Product)=>{
      this.product = data;
    }); 
       
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      reference: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    });
  }

  get f(){
    return this.form.controls;
  }

  onSubmit(){
    if (!this.form.valid) {
      return;
    }
    let product: Product = this.form.value;
    this.productService.update(this.product_id, product).subscribe((res:any) => {         
         this.router.navigateByUrl('product/index');
    })
  }

}
