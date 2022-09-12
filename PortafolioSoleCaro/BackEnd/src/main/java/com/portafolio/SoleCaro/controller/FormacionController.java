
package com.portafolio.SoleCaro.controller;

import com.portafolio.SoleCaro.model.Formacion;
import com.portafolio.SoleCaro.service.IFormacionService;
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
public class FormacionController {
    
    @Autowired
    private IFormacionService formServ;
    
    
    @PostMapping ("/new/formacion")
    public void agregarFormacion (@RequestBody Formacion form){
        formServ.crearFormacion(form);
                
    }
    @GetMapping ("/ver/formacion")
    @ResponseBody
    public List<Formacion> verFormacion(){
        return formServ.verFormacion();
    }
    
    @DeleteMapping ("deleteformacion/{id}")
    public void borrarFormacion (@PathVariable Long id){
        formServ.borrarFormacion(id);
        
    }
    @PostMapping ("/editar/formacion")
    public void editarFormacion (@RequestBody Formacion form){
        formServ.editarFormacion(form);
    }
   
    
}
