
package com.portafolio.SoleCaro.security;

import com.portafolio.SoleCaro.model.User;
import com.portafolio.SoleCaro.security.jwt.JwtTokenUtil;
import com.portafolio.SoleCaro.service.UserService;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

 
@RestController

@CrossOrigin(origins = "https://frontportafoliosole.web.app")
public class AuthApi {
    @Autowired
    AuthenticationManager authManager;
    @Autowired
    JwtTokenUtil jwtTokeUtil;
    @Autowired
    UserService usuarioService;
    @PostMapping("/api/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthRequest request){
        try{
            Authentication authentication=authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(), request.getPassword())
            );
            
            User user =(User) authentication.getPrincipal();
            String accessToken = jwtTokeUtil.generatedAccessToken(user);
            AuthResponse response = new AuthResponse(user.getEmail(), accessToken);
            
            return ResponseEntity.ok().body(response);
            
        }catch(BadCredentialsException ex){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
    }
    @PostMapping("/login/nuevo")
    public ResponseEntity<?> nuevo(@Valid @RequestBody User nuevoUsuario, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        if(usuarioService.existsByEmail(nuevoUsuario.getEmail())){
            return new ResponseEntity("el usuario ya xiste",HttpStatus.BAD_REQUEST);
        }        
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String rawPassword = nuevoUsuario.getPassword();
        String encodePassword = passwordEncoder.encode(rawPassword);
        User newUser = new User(nuevoUsuario.getEmail(),encodePassword);
        usuarioService.save(newUser);
        
        return new ResponseEntity(HttpStatus.CREATED);

    }
}
