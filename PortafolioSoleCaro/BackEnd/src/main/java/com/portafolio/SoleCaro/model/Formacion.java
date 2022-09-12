
package com.portafolio.SoleCaro.model;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
public class Formacion {
    
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Idform;
    
    private String titulo;
    private String descrip;
    private String inicio;
    private String fin;

    public Formacion() {
    }

    public Formacion(Long Idform, String titulo, String descrip, String inicio, String fin) {
        this.Idform = Idform;
        this.titulo = titulo;
        this.descrip = descrip;
        this.inicio = inicio;
        this.fin = fin;
    }
    
    
        
    
}
