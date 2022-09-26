

package com.portafolio.SoleCaro.controller;

import com.portafolio.SoleCaro.model.Proyecto;
import com.portafolio.SoleCaro.service.IProyectoService;
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
/*@CrossOrigin (origins = "http://localhost:4200")*/
public class ProyectoController {
    
    @Autowired
    private IProyectoService proyeServ;
    
    
    @PostMapping ("/new/proyecto")
    public void agregarProyecto (@RequestBody Proyecto pro){
        proyeServ.crearProyecto(pro);
        
    }
    @GetMapping ("/ver/proyecto")
    @ResponseBody
    public List<Proyecto> verProyecto(){
        return proyeServ.verProyecto();
    }
    
    @DeleteMapping ("deleteproyecto/{id}")
    public void borrarProyecto (@PathVariable Long id){
        proyeServ.borrarProyecto(id);
        
    }
    @PostMapping ("/editar/Proyecto")
    public void editarProyecto (@RequestBody Proyecto pro){
        proyeServ.editarProyecto(pro);
    }
    
    
}
