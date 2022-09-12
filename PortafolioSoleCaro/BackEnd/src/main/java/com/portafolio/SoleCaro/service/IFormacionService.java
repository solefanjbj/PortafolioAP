
package com.portafolio.SoleCaro.service;

import com.portafolio.SoleCaro.model.Formacion;
import java.util.List;


public interface IFormacionService {
    
     public List <Formacion> verFormacion ();
     public void crearFormacion (Formacion form);
     public void  borrarFormacion (Long id);
     public Formacion  buscarFormacion (Long id);
     public void  editarFormacion (Formacion form);
}
