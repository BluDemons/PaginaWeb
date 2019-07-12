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
      name: ['',[Validators.required, Validators.minLength(6)]],
      lastname: ['',[Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9_.+-]+@[a-zA-Z0-9-]+.[a-z]+$')]],
      password: ['' ,[Validators.required,Validators.minLength(6)]],
      mensaje:['',[Validators.required]]
    });
  }

  validaLoginForm(){
    if(this.loginform.valid){
      this.name=this.loginform.controls['name'].value
      this.lastname=this.loginform.controls['lastname'].value
      this.email = this.loginform.controls['email'].value
      this.password = this.loginform.controls['password'].value
      console.log(this.loginform)
    }else{
      this.name = JSON.stringify(console.log(this.loginform.controls['name'].errors))
      this.lastname = JSON.stringify(console.log(this.loginform.controls['lastname'].errors))
      this.email = JSON.stringify(console.log(this.loginform.controls['email'].errors))
      this.password = JSON.stringify(console.log(this.loginform.controls['password'].errors))
    }
    if(this.loginform.invalid){
      console.log(this.loginform.controls['email'].errors.pattern)
      alert(JSON.stringify(this.loginform.controls['email'].errors.pattern))
    }
  }
}
