export class Formacion {
    idform? : number;
  
    titulo : String;
    descrip:String;
    inicio: String;
    fin: String;

    constructor(titulo: String,descrip:String,inicio:String,fin:String){
      
      this.titulo=titulo;
      this.descrip =descrip;
      this.inicio=inicio;
      this.fin=fin;


    }
}