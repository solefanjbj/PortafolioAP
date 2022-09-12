
package com.portafolio.SoleCaro.controller;

import com.portafolio.SoleCaro.model.Experiencia;
import com.portafolio.SoleCaro.service.IExperienciaService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin (origins = "http://localhost:4200")
public class ExperienciaController {
    
    @Autowired
    private IExperienciaService expeServ;
    
    
    @PostMapping ("/new/experiencia")
    public void agregarExperiencia (@RequestBody Experiencia exp){
        expeServ.crearExperiencia(exp);
        
    }
    @GetMapping ("/ver/experiencia")
    @ResponseBody
    public List<Experiencia> verExperiencia(){
        return expeServ.verExperiencia();
    }
    
    @DeleteMapping ("deleteexperiencia/{id}")
    public void borrarExperiencia (@PathVariable Long id){
        expeServ.borrarExperiencia(id);
        
    }
    @PostMapping ("/editar/experiencia")
    public void editarExperiencia (@RequestBody Experiencia exp){
        expeServ.editarExperiencia(exp);
    }
    
}