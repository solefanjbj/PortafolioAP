
package com.portafolio.SoleCaro.repository;

import com.portafolio.SoleCaro.model.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProyectoRepository extends JpaRepository <Proyecto, Long>{
    
}
