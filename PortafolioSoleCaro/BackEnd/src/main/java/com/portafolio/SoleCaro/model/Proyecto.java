
package com.portafolio.SoleCaro.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
public class Proyecto {
    
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    private String titulo;
    private String descrip;
    private String imagen;
    private String Link;

    public Proyecto() {
    }

    public Proyecto(Long id, String titulo, String descrip, String imagen, String Link) {
        this.id = id;
        this.titulo = titulo;
        this.descrip = descrip;
        this.imagen = imagen;
        this.Link = Link;
    }
    
    
}
