
package com.portafolio.SoleCaro.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
public class Experiencia {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Idexp;
    
    private String lugar;
    private String descrip;
    private String inicio;
    private String fin;

    public Experiencia() {
    }

    public Experiencia(Long Idexp, String lugar, String descrip, String inicio, String fin) {
        this.Idexp = Idexp;
        this.lugar = lugar;
        this.descrip = descrip;
        this.inicio = inicio;
        this.fin = fin;
    }
    
   
}
