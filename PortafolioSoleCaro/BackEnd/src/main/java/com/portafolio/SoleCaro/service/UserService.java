
package com.portafolio.SoleCaro.service;

import com.portafolio.SoleCaro.model.User;
import com.portafolio.SoleCaro.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class UserService {
     @Autowired
    UserRepository iuserRepo;

    public boolean existsByEmail(String email) {
        return iuserRepo.existsByEmail(email);
    }

    public void save(User usuario) {
        iuserRepo.save(usuario);
    }
    
}
