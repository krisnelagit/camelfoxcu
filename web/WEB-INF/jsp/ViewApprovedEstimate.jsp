<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%-- 
    Document   : ViewApprovedEstimate
    Created on : 01-May-2015, 12:19:26
    Author     : user
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>View Approved Estimate</title>
        <link href="css/other_style.css" rel="stylesheet" type="text/css" />
        <link href="css/csstable.css" rel="stylesheet" type="text/css" />
        <script>
            $(document).ready(function () {

                var sum = 0;
                $('.price').each(function () {
                    sum += parseFloat($(this).text());
                });
                var sum1 = 0;
                $('.labourcharges').each(function () {
                    sum1 += parseFloat($(this).text());
                });
                $('#labourrs').html(sum1)
                $('#partsrs').html(sum)
                var grand = sum + sum1;

                $('#grandamount').text(grand);
            });
        </script>
    </head>
    <body>
        <a href="viewEstimateGridLink?customerid=${sessionScope.CUSTOMERID}" class="view">Back</a>
        <h2>Approved Estimate</h2>
        <br />
        <form action="addapproved" method="POST">
            <input type="hidden" name="estimateid" value="${estcustdtls.estimateid}" />
            <input type="hidden" name="cvid" value="${estcustdtls.cvid}" />
            <table width="100%" cellpadding="5">
                <tr>
                    <td align="left" valign="top">Date</td>
                    <td align="left" valign="top">${estcustdtls.pcldate}</td>
                </tr>
                <tr>
                    <td align="left" valign="top">180 Point id</td>
                    <td align="left" valign="top">${estcustdtls.pclid} <input type="hidden" name="pclid" value="${estcustdtls.pclid}" /> </td>
                </tr>
                <tr>
                    <td width="31%" align="left" valign="top">Customer name</td>
                    <td width="69%" align="left" valign="top"><label for="textfield"></label>
                        ${estcustdtls.customername}</td>
                </tr>
                <tr>
                    <td align="left" valign="top">Vehicle Model</td>
                    <td align="left" valign="top">${estcustdtls.carmodel}</td>
                </tr>
                <tr>
                    <td>Vehicle Number</td>
                    <td>${estcustdtls.vehiclenumber}</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
            </table>
            <hr>
            <table id="dataTable" class="CSSTableGenerator" border="0">
                <tr>
                    <td align="left" width="6%"><strong>Sr.No.</strong></td>
                    <td align="left" width="31%"><strong>Name</strong></td>
                    <td align="left" width="37%"><strong>Description</strong></td>
                    <td align="left" width="37%"><strong>Qty.</strong></td>
                    <td align="center" width="14%"><strong>per item</strong></td>
                    <td align="center" width="12%"><strong>Labour Rs.</strong></td>
                    <td align="center" width="14%"><strong>Parts Rs.</strong></td>
                    <!--<td align="center" width="12%"><strong>&nbsp;</strong></td>-->
                </tr>
                <c:set value="1" var="count"></c:set>
                <c:forEach var="ob" items="${estpartdtls}">
                    <tr>
                        <td align="center" valign="middle">${count}</td>
                        <td align="left" valign="top" ><span class="category-spacing">${ob.partname}</span></td>
                        <td align="left" valign="top">${ob.description}</td>
                        <td align="center" valign="middle" class="quantity">${ob.quantity}</td>
                        <td align="center" valign="middle" class="peritem">${ob.partrs}</td>
                        <td align="center" valign="middle" class="labourcharges">${ob.labourrs}</td>
                        <td align="center" valign="middle" class="price">${ob.totalpartrs}</td>
                        <!--<td align="center" valign="middle"><input type="checkbox" name="estimatedetails" value="$ {ob.edid}"></td>-->
                    </tr>
                    <c:set value="${count+1}" var="count"></c:set>
                </c:forEach>
                <tr>
                    <td align="center" valign="middle">&nbsp;</td>
                    <td align="left" valign="top">&nbsp;</td>
                    <td align="left" valign="top">&nbsp;</td>
                    <td align="left" valign="top">&nbsp;</td>
                    <td align="left" valign="top">&nbsp;</td>
                    <td align="center" valign="middle" class="grandtotal"><strong> <label id="labourrs">  </label></strong></td>
                    <td align="center" valign="middle" class="grandtotallabour"><strong> <label id="partsrs"></label></strong></td>
                    <!--<td align="left" valign="top">&nbsp;</td>-->
                </tr>
                <tr>
                    <td align="center" valign="middle">&nbsp;</td>
                    <td align="left" valign="top">&nbsp;</td>
                    <td align="left" valign="top">&nbsp;</td>
                    <td align="left" valign="top">Taxes extra as applicable.</td>
                    <td align="left" valign="top">&nbsp;</td>
                    <td align="center" valign="middle"><strong>Total</strong></td>
                    <td align="center" valign="middle"><strong><label id="grandamount"></label>/-</strong></td>
                    <!--<td align="left" valign="top">&nbsp;</td>-->
                </tr>
            </table>

        </form>
    </body>
</html>
