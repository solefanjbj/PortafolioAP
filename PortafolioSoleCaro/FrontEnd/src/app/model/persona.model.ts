

 export class Persona{
    id?: number;
    nombre: String;
    titulo: String;
    acercade: String;
    imagen: String;
    face: String;
    twitter: String;
    instagram: String;
    linkedin: String;
    github: String;

    

    constructor(nombre: String,titulo: String,acercade: String,imagen: String,face: String,twitter: String,instagram: String,linkedin: String,github: String){
        
        this.nombre = nombre;
        this.titulo = titulo;
        this.acercade = acercade;
        this.imagen = imagen;
        this.face = face;
        this.twitter = twitter;
        this.instagram = instagram;
        this.linkedin = linkedin;
        this.github = github;

    }
}