
package com.portafolio.SoleCaro.service;

import com.portafolio.SoleCaro.model.Experiencia;
import java.util.List;


public interface IExperienciaService {
    
     public List <Experiencia> verExperiencia ();
     public void crearExperiencia (Experiencia exp);
     public void  borrarExperiencia (Long id);
     public Experiencia  buscarExperiencia (Long id);
     public void  editarExperiencia (Experiencia exp);
     /*public void  editarExperienciaId (Long id);*/
    
    
}
