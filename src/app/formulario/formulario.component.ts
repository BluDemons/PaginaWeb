import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  UsuarioForm: FormGroup
  telefonos: FormArray
  operadoras:string[]

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.crearUsuarioForm();
    this.operadoras=['Claro','CNT','Movistar','Twenty']
  }

  crearUsuarioForm(){
    this.UsuarioForm = this.fb.group({
      nombre: ['',[Validators.required,Validators.pattern('[A-Z]{1}[a-z]{3,10}')]],
      cedula: ['',[]],
      telefonos: this.fb.array([this.crearTelefonoForm()])
    })
  }
  crearTelefonoForm(): FormGroup{
    return this.fb.group({
      operadora:['999',[]],
      numero:['',[]]
    })
  }
  addTelefonoForm(){
    this.telefonos = this.UsuarioForm.get('telefonos') as FormArray
    this.telefonos.push(this.crearTelefonoForm())
  }
  deleteTelefonoForm(i){
    this.telefonos.removeAt(i)
  }
}
