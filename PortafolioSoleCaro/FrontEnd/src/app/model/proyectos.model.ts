export class Proyectos {
    id? : number;
  
    titulo : String;
    descrip:String;
    imagen: String;
    link: String;

    constructor(titulo: String,descrip:String,imagen:String,link:String){
      
      this.titulo=titulo;
      this.descrip =descrip;
      this.imagen=imagen;
      this.link=link;


    }
}