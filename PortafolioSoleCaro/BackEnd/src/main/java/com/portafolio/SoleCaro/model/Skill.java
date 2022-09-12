
package com.portafolio.SoleCaro.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
public class Skill {
    
     @Id
     @GeneratedValue(strategy = GenerationType.AUTO)
     private Long id;
     
     private String nombre;
     private Long porcentaje;

    public Skill() {
    }

    public Skill(Long id, String nombre, Long porcentaje) {
        this.id = id;
        this.nombre = nombre;
        this.porcentaje = porcentaje;
    }
     
     

     
     
     
     
     
    
    
}
