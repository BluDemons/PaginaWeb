import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

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
  phone:string
  email: string
  password: string
  phones: string[]
  selectTipo=[]
  tipoError:boolean = true
  Tipo: Array <string> =['O+','O-','A+','A-','B+','B-','AB+','AB-'];
  telefonos: FormArray
  operadoras:string[]

  constructor(private formBuilder: FormBuilder) { }
  
  ngOnInit() {
    this.crearLoginForm();
    this.operadoras=['Claro','CNT','Movistar','Twenty']
    
  }

  crearLoginForm(){
    this.loginform = this.formBuilder.group({
      tipoSa:this.addTiposSa(),
      name: ['',[Validators.required,Validators.pattern('[A-Z]{1}[a-z]{3,10}')]],
      lastname: ['',[Validators.required,Validators.pattern('[A-Z]{1}[a-z]{3,10}')]],
      phone:['',[Validators.required,Validators.pattern('(09){1}[0-9]{8}')]],
      email: ['', [Validators.required, Validators.pattern('[a-z]+[a-z0-9.-_]*@[a-z]+[a-z0-9]*.[a-z]{2,3}[.]?[a-z]*')]],
      password: ['' ,[Validators.required,Validators.pattern('^[A-Z]?[a-z]+[0-9]+')]],
      telefonos: this.formBuilder.array([this.crearTelefonoForm()])
      //Names: this.formBuilder.array([])
    });
  }

  // get Phones(){
  //   return this.loginform.get('Phones') as FormArray
  // }
  // get Names(){
  //   return this.loginform.get('Names') as FormArray
  // }

  addTelefonoForm(){
    this.telefonos = this.loginform.get('telefonos') as FormArray
    this.telefonos.push(this.crearTelefonoForm())
  }
  deleteTelefonoForm(i){
    this.telefonos.removeAt(i)
  }
  crearTelefonoForm(): FormGroup{
    return this.formBuilder.group({
      operadora:['999',[]],
      numero:['',[]]
    })
  }
  // addNames(){
  //   const nombre = <FormArray>this.loginform.controls['Names']
  //   nombre.push(this.formBuilder.group({Names: []}))
  // }
  
  validaLoginForm(){
    if(this.loginform.valid){
      this.name = JSON.stringify(console.log(this.loginform.controls['name'].value))
      this.lastname = JSON.stringify(console.log(this.loginform.controls['lastname'].value))  
      this.phone = JSON.stringify(console.log(this.loginform.controls['phone'].value))            
      this.email = JSON.stringify(console.log(this.loginform.controls['email'].value))
      this.password = JSON.stringify(console.log(this.loginform.controls['password'].value))
      alert(['Datos Enviados'])
    }else{
      this.name = JSON.stringify(console.log(this.loginform.controls['name'].errors))
      this.lastname = JSON.stringify(console.log(this.loginform.controls['lastname'].errors))
      this.phone = JSON.stringify(console.log(this.loginform.controls['phone'].errors))
      this.email = JSON.stringify(console.log(this.loginform.controls['email'].errors))
      this.password = JSON.stringify(console.log(this.loginform.controls['password'].errors))
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
  get gettiposS(){
    return this.loginform.get('tipoSa') as FormArray;
  }

  addTiposSa(){
    const arr = this.Tipo.map(element=>{
    return this.formBuilder.control(false);
   });
   return this.formBuilder.array(arr);
  }

  getTipo(){
    this.selectTipo=[];
    this.gettiposS.controls.forEach((control,i)=>{
      if(control.value){
        this.selectTipo.push(this.Tipo[i]);
      }
    });console.log(this.selectTipo)
    this.tipoError=this.selectTipo.length>0?false:true
  }
}
