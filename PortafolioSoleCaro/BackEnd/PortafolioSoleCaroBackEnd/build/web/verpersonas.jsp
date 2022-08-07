

<%@page import="java.util.List"%>
<%@page import="logica.Persona"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Ver Personas</title>
    </head>
    <body>
        <h1>Lista de personas</h1>
        <%
            List <Persona> listaPersonas =(List)request.getSession().getAttribute("listaPersonas");
            
            for (Persona per : listaPersonas){
            
            
        %>
        <p><b>DNI:</b><%=per.getDni()%></p>
        <p><b>NOMBRE:</b><%=per.getNombre()%></p>
        <p><b>APELLIDO</b><%=per.getApellido()%></p>
        <p><b>TELEFONO:</b><%=per.getTelefono()%></p>
        <p>---------------------------</p>
        <%
            }
        %>
            
    </body>
</html>
