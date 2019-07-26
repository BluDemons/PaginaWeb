import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
//generar reportes
import jsPDF from 'jsPDF';

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
    let size = 18
    let intelineado = 10
    var logo = new Image();
    logo.src = '../../assets/img/images2.jpg';
    var imagen = new Image();
    imagen.src='../../assets/img/imagen02.jpg'
    let texto='El gigante del dance belga es, sin duda, el emperador de Europa y cada año atrae a amantes de la música electrónica de todo el mundo con sus famosos escenarios, producción visual y un cartel a rebosar de grandes nombres desde EDM hasta hardstyle. El festival ha organizado otros eventos en los cinco continentes, pero la fiesta original en la ciudad de Boom será siempre la más característica.'
    let doc=new jsPDF({
      orientation:'P',
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
    doc.addImage(imagen,x+15,97,130,130,doc.internal.pageSize.height-30);
    doc.setTextColor(70,142,231)
    doc.setFontSize(size);
    doc.setFont("helvetica","bold");
    doc.text('Festivales de música',x,y);
    doc.line(25, 32, 180, 32);
    doc.addImage(logo, 'JPEG', 150, 10, 30, 20);

    doc.setFont('Comic Sans',null);
    doc.setTextColor(13,223,240);;
    doc.setFontSize(size-6);
    y=y+(size*sizemm)+intelineado;
    doc.text(texto,x,y,{maxWidth:150});
    doc.setTextColor(150);
    doc.setFontSize(100);
    doc.text(45, doc.internal.pageSize.height - 30, 'Juan Rojas',45);
    doc.setFontSize(size-6);
    doc.setTextColor(0,0,0);
    doc.setFont('Comic Sans',null);
    doc.text('andrejuan11048@gmail.com',x,y+240,{maxWidth:200});
    doc.save('juanPDF');
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
