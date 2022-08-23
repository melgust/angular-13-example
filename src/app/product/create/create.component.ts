import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent implements OnInit {

  form!: FormGroup;
  
  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
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
    this.productService.create(product).subscribe((res:any) => {
      Swal.fire(
        'Exito',
        res.message,
        'success'
      )
         this.router.navigateByUrl('product/index');
    })
  }

}
