
package com.portafolio.SoleCaro.service;

import com.portafolio.SoleCaro.model.Persona;
import java.util.List;


public interface IPersonaService {
    
    public List <Persona> verPersonas ();
    public void crearPersona (Persona per);
    public void  borrarPersona (Long id);
    public Persona  buscarPersona (Long id);
    
    
}
