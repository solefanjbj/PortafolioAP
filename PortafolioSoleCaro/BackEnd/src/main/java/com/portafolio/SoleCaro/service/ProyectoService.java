
package com.portafolio.SoleCaro.service;

import com.portafolio.SoleCaro.model.Proyecto;
import com.portafolio.SoleCaro.repository.ProyectoRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ProyectoService implements IProyectoService {
    
    
    @Autowired
    public ProyectoRepository proyeRepo;

    @Override
    public List<Proyecto> verProyecto() {
        return proyeRepo.findAll();
    }

    @Override
    public void crearProyecto(Proyecto pro) {
        proyeRepo.save(pro);
    }

    @Override
    public void borrarProyecto(Long id) {
        proyeRepo.deleteById(id);
    }

    @Override
    public Proyecto buscarProyecto(Long id) {
        return proyeRepo.findById(id).orElse(null);
        
    }

    @Override
    public void editarProyecto(Proyecto exp) {
        proyeRepo.save(exp);
        

    }
    
}
