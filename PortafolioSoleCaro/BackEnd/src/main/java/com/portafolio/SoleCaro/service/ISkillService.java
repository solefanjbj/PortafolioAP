
package com.portafolio.SoleCaro.service;

import com.portafolio.SoleCaro.model.Skill;
import java.util.List;


public interface ISkillService {
    
    public List <Skill> verSkill ();
     public void crearSkill (Skill sk);
     public void  borrarSkill (Long id);
     public Skill  buscarSkill (Long id);
     public void  editarSkill (Skill sk);
    
}
