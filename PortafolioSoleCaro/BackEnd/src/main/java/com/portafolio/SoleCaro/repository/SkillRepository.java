
package com.portafolio.SoleCaro.repository;

import com.portafolio.SoleCaro.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillRepository extends JpaRepository <Skill, Long>{
    
}
