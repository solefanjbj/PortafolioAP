
package com.portafolio.SoleCaro.service;

import com.portafolio.SoleCaro.model.Formacion;
import com.portafolio.SoleCaro.repository.FormacionRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class FormacionService implements IFormacionService {
    
    @Autowired
    public FormacionRepository formRepo;

    @Override
    public List<Formacion> verFormacion() {
        return formRepo.findAll();
    }

    @Override
    public void crearFormacion(Formacion form) {
        formRepo.save(form);
    }

    @Override
    public void borrarFormacion(Long id) {
        formRepo.deleteById(id);
    }

    @Override
    public Formacion buscarFormacion(Long id) {
        return formRepo.findById(id).orElse(null);
    }

    @Override
    public void editarFormacion(Formacion form) {
        formRepo.save(form);
        
    }
    
}
