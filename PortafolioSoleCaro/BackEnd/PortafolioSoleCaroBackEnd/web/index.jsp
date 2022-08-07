<%-- 
    Document   : Index
    Created on : 7 ago. 2022, 13:14:54
    Author     : Sole
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Datos de la persona</h1>
        
        <form action="" method="">
            <p><label>DNI</label><input type="text" name="dni"></p>
            <p><label>NOMBRE</label><input type="text" name="nombre"></p>
            <p><label>APELLIDO</label><input type="text" name="apellido"></p>
            <p><label>TELEFONO</label><input type="text" name="telefono"></p>
            <button type="submit">Enviar</button>
        </form>
        
        <h1>Lista de personas</h1>
        <p>Si desea ver las personas presione el boton MOSTRAR</p>
        <form action="" method="">
            <button type="submit">MOSTRAR</button>
        </form>
        
        <h1>Eliminar persona</h1>
        <p>Ingrese el dni para eliminar la persona</p>
        <form action="" method="">
             <p><label>DNI</label><input type="text" name="elim_dni"></p>
             <button type="submit">ELIMINAR</button>
        </form>
       
    </body>
</html>
