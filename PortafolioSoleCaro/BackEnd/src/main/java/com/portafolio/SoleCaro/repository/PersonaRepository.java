
package com.portafolio.SoleCaro.repository;

import com.portafolio.SoleCaro.model.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonaRepository extends JpaRepository <Persona, Long> {
    
    
}
