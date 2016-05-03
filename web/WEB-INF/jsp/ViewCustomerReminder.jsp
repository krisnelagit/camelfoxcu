<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%-- 
    Document   : ViewCustomerReminder
    Created on : 26-Jun-2015, 11:18:19
    Author     : user
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>View Customer Reminder</title>   
        <link href="css/jquery-ui_1.css" rel="stylesheet" type="text/css" />
        <script src="js/jquery-ui.js"></script>
        <script>
            $(function () {
                //popup for viewing message begin here
                $("#dialognk").hide();
                //on click of view
                $(".message_link").click(function (e) {
                    e.preventDefault();
                    var rcid = $(this).attr('href');
                    $("#message").text('');
                    $("#date_time").text('');
                    $.ajax({
                        url: "getReminderCustomerDetails",
                        datatype: 'json',
                        type: 'POST',
                        data: {
                            rcid: rcid
                        },
                        cache: false,
                        success: function (data) {
                            if (data) {
                                $("#message").text(data[0].message);
                                $("#date_time").text(data[0].date_time);

                                $("#dialognk").dialog({
                                    modal: true,
                                    effect: 'drop',
                                    show: {
                                        effect: "drop"
                                    },
                                    hide: {
                                        effect: "drop"
                                    }
                                });
                            }

                        }
                    });
                });

            });//END FUNCTION
        </script>
        <link rel="stylesheet" type="text/css" href="css/jquery.dataTables.css">
        <script src="js/jquery.dataTables.js"></script>
        <script>
            $(document).ready(function () {
                $('#table_id').DataTable();

            });
        </script>
    </head>
    <body>
        <h2>Reminder</h2>

        <table class="display tablestyle" id="table_id">
            <thead>
                <tr>
                    <td>Sr. No.</td>
                    <td>Date</td>
                    <td>Car model</td>
                    <td>Message</td>
                    <td>&nbsp;</td>
                </tr>
            </thead>
            <tbody>

                <c:set value="1" var="count"></c:set>
                <c:forEach var="ob" items="${messagedetails}">
                    <tr>
                        <td align="left">${count}</td>
                        <td align="left">${ob.date_time}</td>
                        <td align="left">${ob.vehiclename}</td>
                        <td align="left">${ob.mymessage}...</td>
                        <td align="left">
                            <a href="${ob.rcid}" class="message_link">Read..</a>
                        </td>
                        <!--&nbsp;&nbsp; <a href="editCustomerDetailsLink?customerid=$ {ob.id}"><img src="images/edit.png" width="16" height="15"></a>&nbsp;&nbsp;-->
                        <!--<a href="" onclick="confirmdelete('$ {ob.id}', this);"><img src="images/delete.png" width="16" height="17" /></a>-->
                    </tr>  
                    <c:set value="${count+1}" var="count"></c:set>
                </c:forEach> 
            </tbody>
        </table>

        <!--invoice list for the vehicle in pop up start here-->
        <div id="dialognk" title="Reminder Detail">
            <table width="100%" cellpadding="5">
                <tr>
                    <td width="34%" align="left" valign="top">Date & time</td>
                    <td width="66%" align="left" valign="top"><span id="date_time"></span></td>
                </tr>
                <tr>
                    <td width="34%" align="left" valign="top">Message</td>
                    <td width="66%" align="left" valign="top"><span id="message"></span></td>
                </tr>
                <tr>    
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
            </table>
        </form>
    </div>
    <!--invoice list for the vehicle in pop up end here-->

</body>
</html>
