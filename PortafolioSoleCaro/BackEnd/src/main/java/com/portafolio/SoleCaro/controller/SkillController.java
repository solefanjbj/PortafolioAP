
package com.portafolio.SoleCaro.controller;

import com.portafolio.SoleCaro.model.Skill;
import com.portafolio.SoleCaro.service.ISkillService;
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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
/*@CrossOrigin (origins = "http://localhost:4200")*/
public class SkillController {
    
    @Autowired
    private ISkillService skServ;
    
    
    @PostMapping ("/new/skill")
    public void agregarSkill (@RequestBody Skill sk){
        skServ.crearSkill(sk);
        
    }
    @GetMapping ("/ver/skill")
    @ResponseBody
    public List<Skill> verSkill(){
        return skServ.verSkill();
    }
    
    
    @DeleteMapping ("deleteskill/{id}")
    public void borrarSkill (@PathVariable Long id){
        skServ.borrarSkill(id);
        
    }
    @PostMapping ("/editar/skill/{id}")
    public void editarSkill (@RequestBody Skill sk){
        skServ.editarSkill(sk);
    }
    @GetMapping("/ver/skill/id/{id}")
    public ResponseEntity<Skill> getById(@PathVariable("id") Long id){
        Skill skill = skServ.buscarSkill(id);
        return new ResponseEntity(skill, HttpStatus.OK);
    }
    
}
