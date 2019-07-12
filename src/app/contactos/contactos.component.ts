import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss']
})
export class ContactosComponent implements OnInit {

  loginform: FormGroup
  registroUsuariosForm: FormGroup
  name:string
  lastname: string
  email: string
  password: string
  mensaje :any

  constructor(private formBuilder: FormBuilder) { }
  
  ngOnInit() {
    this.crearLoginForm();
    
  }

  crearLoginForm(){
    this.loginform = this.formBuilder.group({
      name: ['',[Validators.required,Validators.pattern('[A-Z]{1}[a-z]{3,10}')]],
      lastname: ['',[Validators.required,Validators.pattern('[A-Z]{1}[a-z]{3,10}')]],
      email: ['', [Validators.required, Validators.pattern('[a-z]+[a-z0-9.-_]*@[a-z]+[a-z0-9]*.[a-z]{2,3}[.]?[a-z]*')]],
      password: ['' ,[Validators.required,Validators.pattern('^[A-Z]?[a-z]+[0-9]+')]],
    });
  }

  validaLoginForm(){
    if(this.loginform.valid){
      this.name=JSON.stringify(console.log(this.loginform.controls['name'].value))
      this.lastname=JSON.stringify(console.log(this.loginform.controls['lastname'].value))              
      this.email = JSON.stringify(console.log(this.loginform.controls['email'].value))
      this.password =JSON.stringify(console.log(this.loginform.controls['password'].value))
    }else{
      this.name = JSON.stringify(console.log(this.loginform.controls['name'].errors))
      this.lastname = JSON.stringify(console.log(this.loginform.controls['lastname'].errors))
      this.email = JSON.stringify(console.log(this.loginform.controls['email'].errors))
      this.password =JSON.stringify(console.log(this.loginform.controls['password'].errors))
      }
    }

  public getError(controlName: string): string {
    let error = '';
    const control = this.loginform.get(controlName);
    if (control.touched && control.errors != null) {
      error = JSON.stringify(control.errors);
    }
    return error;
  }

}
