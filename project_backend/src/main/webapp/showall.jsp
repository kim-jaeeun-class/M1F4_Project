<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
    
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>


<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>show all</title>


</head>
<body>


<c:forEach var="viewall" items="${viewall}">

\${viewall.id } = ${viewall.id};<br>
\${viewall.name } = ${viewall.name};<br>
\${viewall.pw } = ${viewall.pw};<br>
\${viewall.user_level } = ${viewall.level};<br>
<hr>

</c:forEach>

</body>
</html>