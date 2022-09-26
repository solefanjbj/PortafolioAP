
package com.portafolio.SoleCaro.controller;

import com.portafolio.SoleCaro.model.Skill;
import com.portafolio.SoleCaro.service.ISkillService;
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
public class SkillController {
    
    @Autowired
    private ISkillService skServ;
    
    
    @PostMapping ("/new/Skill")
    public void agregarSkill (@RequestBody Skill sk){
        skServ.crearSkill(sk);
        
    }
    @GetMapping ("/ver/Skill")
    @ResponseBody
    public List<Skill> verSkill(){
        return skServ.verSkill();
    }
    
    @DeleteMapping ("deleteSkill/{id}")
    public void borrarSkill (@PathVariable Long id){
        skServ.borrarSkill(id);
        
    }
    @PostMapping ("/editar/Skill")
    public void editarSkill (@RequestBody Skill sk){
        skServ.editarSkill(sk);
    }
    
    
}
