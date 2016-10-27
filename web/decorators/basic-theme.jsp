<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib uri="http://www.opensymphony.com/sitemesh/decorator" prefix="decorator" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Karworx - <decorator:title default="Welcome!" /></title>
        <link href="css/main.css" rel="stylesheet" type="text/css" />
        <link href="css/dropdown.css" rel="stylesheet" type="text/css" />
        <script src="js/jquery-1.10.2.min.js"></script>

        <decorator:head/>

        <link rel="shortcut icon" href="images/krisnela_technologies.ico"></link>
    </head>

    <body>
            <div class="topheader"></div>
            <header>
                <div class="container-header">
                    <a href="viewReminderGridLink?customerid=${sessionScope.CUSTOMERID}"><div class="logo"></div></a>
                    <div class="example">
                        <ul id="nav">
                            <li><a href="viewReminderGridLink?customerid=${sessionScope.CUSTOMERID}">Dashboard</a></li>
                            <li><a href="viewEstimateGridLink?customerid=${sessionScope.CUSTOMERID}">Estimate</a></li>
                            <li><a href="viewCustomerDetailsLink?customerid=${sessionScope.CUSTOMERID}">Service History</a></li>
                            <li><a href="viewCustomerProfileLink?customerid=${sessionScope.CUSTOMERID}">Profile</a></li>
                            <li><a href="viewCustomerCheckList?customerid=${sessionScope.CUSTOMERID}">CheckList</a></li>
                            <li><a href="fbgridLink?customerid=${sessionScope.CUSTOMERID}">Feedback</a></li>
                            
                            <table width="70" class="settings-right">
                                <tr>
                                    <td><a href="logout"><div class="logout-admin"></div></a></td>
                                </tr>
                            </table>
                        </ul>
                    </div>
            </header>        
        <div class="container">
            <div id="modps" class="ps">
                <decorator:body/>

            </div>
        </div>
    </body>
</html>