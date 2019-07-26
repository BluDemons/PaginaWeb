import jsPDF from 'jsPDF';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  docPdf:jsPDF

  constructor() { }

  ngOnInit() {
  }
  pdf(){
    let x = 25
    let y = 25
    let textoArray=['jose','juan','lenin','Paola']
    let altoTotal=290
    let anchoTotal=210
    const marDer=25
    const marIzq=25
    const marSup=25
    const marInf=25
    let interlineado=1
    let anchoUso= anchoTotal-marIzq-marDer
    let altoUso=altoTotal-marSup-marInf
    let textSize=16
    let texto='El gigante del dance belga es, sin duda, el emperador de Europa y cada año atrae a amantes de la música electrónica de todo el mundo con sus famosos escenarios, producción visual y un cartel a rebosar de grandes nombres desde EDM hasta hardstyle. El festival ha organizado otros eventos en los cinco continentes, pero la fiesta original en la ciudad de Boom será siempre la más característica.'
    let doc=new jsPDF({
      orientation:'P',
      unit:'mm',
      format: 'A4',
      compress:true,
    })
    doc.setFontSize(textSize);
    for(let i=0;i<=20;i++){
      let lineas = doc.splitTextToSize(texto,anchoUso);
      if(y==25){
        doc.text(lineas,x,y,{maxWidth:50})
        var dim=doc.getTextDimensions(lineas);
        var altoParrafo= Math.ceil(dim.h)+(textSize*0.3515)*interlineado;
        y+= altoParrafo;
        var anchoParrafo= Math.ceil(dim.h);
        x+= anchoParrafo;
      }else if(y<altoUso){
        altoParrafo = Math.ceil(dim.h)+(textSize*0.3515)*interlineado;
        if((y+altoParrafo)<altoUso){
          doc.text(lineas,x,y,{maxWidth:50})
          y+=altoParrafo
          x+=anchoParrafo
        }else{
          doc.text(lineas,x,y,{maxWidth:50})
          y+=altoParrafo
          doc.addPage()
          y=25
        }
      }
    }
  doc.save('juanPDF.pdf')
  }
  }

  //   function crearColumna(texto) {
  //     var result = [];
  //     for (var i = 0; i < texto.length; i += 1) {
  //         result.push({
  //         'Columna1' : texto[i]
  //         });
  //     }
  //     return result;
  // }
  // var headers = crearColumna(["Columna1", "Columna2"]);
  // doc.table(1,1,headers,{ autoSize: true })
    // doc.text(texto,x,y);
    // doc.text(texto,x,y+30,{maxWidth:anchoUso});
    // let lineas = doc.splitTextToSize(texto,anchoUso);
    // alert(lineas.length);
    // doc.text(textoArray,x,y+90)
    // doc.text(lineas,x,y+120);
    //let dim=doc.getTextDimensions(lineas);
    // doc.text(lineas,x,y);
    // let altoParrafo= Math.ceil(dim.h)+(textSize*0.3515)*interlineado;//para crear interlineado de 2 cm,1.5cm o normal
    // y+= altoParrafo;
    // doc.text(lineas,x,y);
  
  
  // plantilla(doc:jsPDF,empresa:string,ruc:string,slogan:string,urlLogo:string,direccion:string,telefono:number,mail:string,marca:string){
  //   var logo = new Image();
  //   logo.src = '../../assets/img/images2.jpg';
  //   let y=10;
  //   doc.addImage(logo, 'JPEG', 25, 5, 35, 20);
  //   doc.setFontSize(18)
  //   doc.setTextColor(13,223,240)
  //   doc.setFont("helvetica","bold");
  //   var dim=doc.getTextDimensions(empresa);
  //   var Xcentrado=(160-dim.w)/2
  //   doc.text(empresa,Xcentrado,y);
  //   doc.setFontSize(10);
  //   doc.setFontType(null)
  //   var Ycentrado= y+=dim.h
  //   dim=doc.getTextDimensions(ruc);
  //   Xcentrado=(160-dim.w)/2
  //   doc.text(ruc,Xcentrado,Ycentrado)
  //   doc.text(empresa,Xcentrado,y);
  //   doc.setFontSize(10);
  //   doc.setFontType('Italy','bold')
  //   var Ycentrado= y+=dim.h
  //   dim=doc.getTextDimensions(slogan);
  //   Xcentrado=(160-dim.w)/2
  //   doc.text(ruc,Xcentrado,Ycentrado)
  //   doc.save('juan')    
  // };
//   doPdf=new jsPDF({
//     orientation:'P',
//     unit:'mm',
//     format: 'A4',
//     compress:true,
//   })

