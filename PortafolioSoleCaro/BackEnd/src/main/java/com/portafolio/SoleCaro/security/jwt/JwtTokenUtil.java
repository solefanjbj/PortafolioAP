
package com.portafolio.SoleCaro.security.jwt;

import io.jsonwebtoken.Jwts;
import com.portafolio.SoleCaro.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenUtil {
    private static final Logger LOGGER= LoggerFactory.getLogger(JwtTokenUtil.class);
    private static final long EXPIRE_DURATION=1*60*60*1000;
    @Value("{app.jwt.secret")
    private String secretKey;
    
    public String generatedAccessToken(User user){
        return Jwts.builder()
                .setSubject(user.getId()+","+user.getEmail())
                .setIssuer("")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+ EXPIRE_DURATION))
                .signWith(io.jsonwebtoken.SignatureAlgorithm.HS512,secretKey)
                .compact();
        
        
        
    }
    public boolean validateAccessToken(String token){
        try{
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        }catch (ExpiredJwtException ex){ 
            LOGGER.error("JWT expired",ex);
        }catch(IllegalArgumentException ex){
            LOGGER.error("Tokken us null, empty or has only whitespaces",ex);
        }catch(MalformedJwtException ex){
            LOGGER.error("JWT is invalid", ex);
        }catch(UnsupportedJwtException ex){
            LOGGER.error("JWT is not suported", ex);           
            
        }catch (SignatureException ex){
            LOGGER.error("signature validation failed",ex);
            
        }
        return false;
    }
    public String getSubject(String token){
        return parseClaims(token).getSubject();
    }
    private Claims parseClaims(String token){
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token) 
                .getBody();
                        
                
    }
}
