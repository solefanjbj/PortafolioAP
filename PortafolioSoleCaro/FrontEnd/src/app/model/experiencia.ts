export class Experiencia {
      idexp? : number;
    
      lugar : String;
      descrip:String;
      inicio: String;
      fin: String;

      constructor(lugar: String,descrip:String,inicio:String,fin:String){
        
        this.lugar=lugar;
        this.descrip =descrip;
        this.inicio=inicio;
        this.fin=fin;


      }
}
