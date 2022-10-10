
package com.portafolio.SoleCaro.repository;

import com.portafolio.SoleCaro.model.Experiencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperienciaRepository extends JpaRepository <Experiencia, Long> {

}
