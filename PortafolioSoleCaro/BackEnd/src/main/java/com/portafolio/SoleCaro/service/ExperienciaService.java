
package com.portafolio.SoleCaro.service;

import com.portafolio.SoleCaro.model.Experiencia;
import com.portafolio.SoleCaro.repository.ExperienciaRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class ExperienciaService implements IExperienciaService{
    
    @Autowired
    public ExperienciaRepository expeRepo;

    @Override
    public List<Experiencia> verExperiencia() {
        
        return expeRepo.findAll();
    }

    @Override
    public void crearExperiencia(Experiencia exp) {
        expeRepo.save(exp);
    }

    @Override
    public void borrarExperiencia(Long id) {
        expeRepo.deleteById(id);
    }

    @Override
    public Experiencia buscarExperiencia(Long id) {
        return expeRepo.findById(id).orElse(null);
    }

    
    @Override
    public void editarExperiencia(Experiencia exp) {
        expeRepo.save(exp);
    }
/*
    @Override
    public void editarExperienciaId(Long id) {
        expeRepo.save(exp);
    }
*/

  
    
}
