<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%-- 
    Document   : TrackStatus
    Created on : 26 Oct, 2016, 10:48:38 AM
    Author     : krisenla
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <link href="css/progress_bar.css" rel="stylesheet" type="text/css" />
    </head>
    <body>
        <div class="checkout-wrap">
            <h2>Track Car Status</h2>
            <ul class="checkout-bar">
                <c:choose>
                    <c:when test="${trackdt.servicechecklist=='Yes'}">
                        <li class="active">Checklist</li>
                        </c:when>
                        <c:otherwise>
                        <li class="">Checklist</li>
                    </c:otherwise>
                </c:choose>
                <c:choose>
                    <c:when test="${trackdt.pointready=='Yes'}">
                        <li class="active">180</li>
                        </c:when>
                        <c:otherwise>
                        <li class="">180</li>
                    </c:otherwise>
                </c:choose>
                <c:choose>
                    <c:when test="${trackdt.estimate=='Yes'}">
                        <li class="active">Estimate</li>
                        </c:when>
                        <c:otherwise>
                        <li class="">Estimate</li>
                    </c:otherwise>
                </c:choose>
                <c:choose>
                    <c:when test="${trackdt.jobsheet=='Yes'}">
                        <li class="active">Jobsheet</li>
                        </c:when>
                        <c:otherwise>
                        <li class="">Jobsheet</li>
                    </c:otherwise>
                </c:choose>
                <c:choose>
                    <c:when test="${trackdt.sparepart=='Yes'}">
                        <li class="active">Requisition</li>
                        </c:when>
                        <c:otherwise>
                        <li class="">Requisition</li>
                    </c:otherwise>
                </c:choose>
                <c:choose>
                    <c:when test="${trackdt.cleaning=='Yes'}">
                        <li class="active">Verification</li>
                        </c:when>
                        <c:otherwise>
                        <li class="">Verification</li>
                    </c:otherwise>
                </c:choose>
                <c:choose>
                    <c:when test="${trackdt.invoice=='Yes'}">
                        <li class="active">Invoice</li>
                        </c:when>
                        <c:otherwise>
                        <li class="">Invoice</li>
                    </c:otherwise>
                </c:choose>
            </ul>
        </div>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
    </body>
</html>
