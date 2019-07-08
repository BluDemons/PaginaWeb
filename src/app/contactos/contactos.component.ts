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
  usuario:string
  email: string
  password: string
  mensaje :any

  constructor(private formBuilder: FormBuilder) { }
  
  ngOnInit() {
    this.crearLoginForm();
    
  }

  crearLoginForm(){
    this.loginform = this.formBuilder.group({
      usuario: ['', Validators.required, Validators.minLength(6)],
      email: ['', [Validators.required, Validators.email]],
      password: ['' ,[Validators.required,Validators.minLength(6)]],
      mensaje:['',[Validators.required]]
    });
  }

  validaLoginForm(){
    if(this.loginform.valid){
      this.usuario=this.loginform.controls['usuario'].value
      this.email = this.loginform.controls['email'].value
      this.password = this.loginform.controls['password'].value
    }else{
      this.usuario = ' '
      this.email = ''
      this.password = ''
      this.mensaje =  JSON.stringify(this.loginform.controls['usuario'].errors)
      if(this.mensaje){
        alert('dawdwad')
      }
    }
  }

}
