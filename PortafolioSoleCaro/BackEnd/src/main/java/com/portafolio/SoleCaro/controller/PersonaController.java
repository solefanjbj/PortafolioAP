
package com.portafolio.SoleCaro.controller;

import com.portafolio.SoleCaro.model.Persona;
import com.portafolio.SoleCaro.service.IPersonaService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
/*@RequestMapping("/Persona")*/
/*@CrossOrigin (origins = "http://localhost:4200")*/
public class PersonaController {
    
    @Autowired
    IPersonaService persoServ;
    
    
    @PostMapping ("/new/persona")
    public void agregarPersona (@RequestBody Persona pers){
        persoServ.crearPersona(pers);
        
    }
    
   
    @GetMapping ("/ver/personas")
    @ResponseBody
    public List<Persona> verPersonas(){
        return persoServ.verPersonas();
    }
    
    @DeleteMapping ("deletepersona/{id}")
    public void borrarPersona (@PathVariable Long id){
        persoServ.borrarPersona(id);
    }
    
    @PostMapping ("/editar/persona")
    public void editarPersona (@RequestBody Persona pers){
        persoServ.editarPersona(pers);
    }
    @GetMapping("/personas/traer/perfil")
    public Persona findPersona(){
        return persoServ.findPersona((long)1);
    }
    
   
     
}
