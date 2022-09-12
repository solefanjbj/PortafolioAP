
package com.portafolio.SoleCaro.repository;

import com.portafolio.SoleCaro.model.Formacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormacionRepository extends JpaRepository <Formacion, Long>{
    
}
