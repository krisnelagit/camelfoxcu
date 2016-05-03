<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%-- 
    Document   : ViewCustomerDetails
    Created on : 26-Jun-2015, 11:18:19
    Author     : user
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>View Customer Details</title>         
    </head>
    <body>
        <!--customer profile detail start here-->
        <h2>Customer Profile</h2>

        <br />

        <table width="100%" cellpadding="5">
            <tr>
                <td width="35%" align="left" valign="top">Date
                </td>
                <td width="65%" align="left" valign="top">
                    ${customerprofile.savedate}
                </td>
            </tr>


            <tr>
                <td align="left" valign="top">Customer ID</td>
                <td align="left" valign="top">${customerprofile.id}</td>
            </tr>

            <tr>
                <td align="left" valign="top">Customer Name</td>
                <td align="left" valign="top">${customerprofile.name}</td>
            </tr>
            <tr>
                <td align="left" valign="top">Address</td>
                <td align="left" valign="top">
                    ${customerprofile.address}</td>
            </tr>
            <tr>
                <td align="left" valign="top">Phone Number</td>
                <td align="left" valign="top">${customerprofile.mobilenumber}</td>
            </tr>
            <tr>
                <td align="left" valign="top">Email Address</td>
                <td align="left" valign="top">${customerprofile.email}</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
        </table>
        <!--customer profile detail end here-->

        

    </body>
</html>
