
package com.portafolio.SoleCaro.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
public class Persona {
    
    @Id   
    private Long id;
    
    
    private String nombre;
    private String titulo;
    @Size(min = 1, max=1000)
    private String acercade;
    private String imagen;
    private String face;
    private String twitter;
    private String instagram;
    private String linkedin;
    private String github;
           
    

    public Persona() {
    }

    

    public Persona(Long id, String nombre, String titulo, String acercade, String imagen, String face, String twitter, String instagram, String linkedin, String github) {
        this.id = id;
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
