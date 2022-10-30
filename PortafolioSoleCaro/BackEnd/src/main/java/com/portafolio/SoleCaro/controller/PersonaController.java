
package com.portafolio.SoleCaro.controller;

import com.portafolio.SoleCaro.model.Persona;
import com.portafolio.SoleCaro.service.IPersonaService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/api")
/*@RequestMapping("/Persona")*/
//@CrossOrigin (origins = "https://frontportafoliosole.web.app")
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
    /*
    @PostMapping ("/ver/persona/id/{id}")
    public void editarExperiencia (@RequestBody Persona id){
        persoServ.editarPersona(id);
    }*/
    
   
    
    @GetMapping("/personas/traer/perfil")
    public Persona findPersona(){
        return persoServ.findPersona((long)1);
    }
    
    @GetMapping("/ver/persona/id/{id}")
    public ResponseEntity<Persona> getById(@PathVariable("id") Long id){
        Persona persona = persoServ.buscarPersona(id);
        return new ResponseEntity(persona, HttpStatus.OK);
    }
    
   
     
}
