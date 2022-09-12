
package com.portafolio.SoleCaro.service;

import com.portafolio.SoleCaro.model.Skill;
import com.portafolio.SoleCaro.repository.SkillRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SkillService implements ISkillService {
    
    @Autowired
    public SkillRepository skRepo;
    

    @Override
    public List<Skill> verSkill() {
        return skRepo.findAll();
        
    }

    @Override
    public void crearSkill(Skill sk) {
        skRepo.save(sk);
        
        
    }

    @Override
    public void borrarSkill(Long id) {
        skRepo.deleteById(id);
        
        
    }

    @Override
    public Skill buscarSkill(Long id) {
        return skRepo.findById(id).orElse(null);
        
    }

    @Override
    public void editarSkill(Skill sk) {
         skRepo.save(sk);
    }
    
}
