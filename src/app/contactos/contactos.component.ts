import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
//generar reportes
import jsPDF from 'jsPDF';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss'],
})
export class ContactosComponent implements OnInit {

  loginform: FormGroup
  registroUsuariosForm: FormGroup
  name:string
  lastname: string
  phone:string
  email: string
  password: string
  selectTipo=[]
  tipoError:boolean = true
  Tipo: Array <string> =['O+','O-','A+','A-','B+','B-','AB+','AB-'];
  telefonos: FormArray
  operadoras:string[]

  @Input('parentData') public nombre;
  @Output() public childEvent= new EventEmitter();

  constructor(private formBuilder: FormBuilder) { }
  
  ngOnInit() {
    this.crearLoginForm();
    this.operadoras=['Claro','CNT','Movistar','Twenty']
  }

  fireEvent(){
    this.childEvent.emit('Hey juan Andres');
  }
  
  pdf(){
    let x = 25
    let y = 25
    const sizemm = 0.3515
    let size = 14
    let intelineado = 10
    let rosa= '#ff0080'
    let texto='Coordinar (en unidades declaradas al inicio del documento PDF) contra el borde superior de la página.'
    let doc=new jsPDF({
      orientation:'L',
      unit:'mm',
      format: 'A4',
      compress:true,
    })
    // doc.setFontSize(size)
    // doc.text('MI PDF con tamaño de letra',x,y) 
    // y=y+(size*sizemm)+intelineado
    // doc.text('tengo una nueva linea',x,y)
    // size=22
    // y=y+(size*sizemm)+intelineado
    // doc.text('cambie el tamaño de letra',x,y)
    // doc.setTextColor(rosa)
    doc.setFontSize(size)
    x=x+(size*sizemm)+intelineado
    doc.text('DATOS GENERALES',x,y)
    y=y+(size*sizemm)+intelineado
    doc.text('Nombre:',x,y)
    x=y+(size*sizemm)+intelineado
    doc.text('Apellido:',x,y)
    y=y+(size*sizemm)+intelineado
    doc.text('Dirección:',x,y)
    y=y+(size*sizemm)+intelineado
    doc.text('Teléfono:',x,y)
    x=y+(size*sizemm)+intelineado
    doc.text('Fecha de Nacimiento:',x,y)
    y=y+(size*sizemm)+intelineado
    doc.text(texto,x,y,{maxWidth:200})
    doc.save('juanPDF')
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

  addTelefonoForm(){
    this.telefonos = this.loginform.get('telefonos') as FormArray
    this.telefonos.push(this.crearTelefonoForm())
  }
  deleteTelefonoForm(i){
    this.telefonos = this.loginform.get('telefonos') as FormArray
    this.telefonos.removeAt(i)
  }
  crearTelefonoForm(): FormGroup{
    return this.formBuilder.group({
      operadora:['999',[]],
      numero:['',[]]
    })
  }
  
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
