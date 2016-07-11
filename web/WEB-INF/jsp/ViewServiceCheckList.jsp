<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%-- 
    Document   : ViewServiceCheckList
    Created on : 04-May-2015, 10:44:10
    Author     : user
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>View Service CheckList</title>
        <script src="js/jquery-1.8.3.js" type="text/javascript"></script>
        <!--<script src="js/jquery.tools.min.js"></script>-->
        <script src="js/jquery-ui.js" type="text/javascript"></script>

        <!--<link rel="stylesheet" type="text/css" href="css/tabs-accordion.css"/>-->
        <link rel="stylesheet" href="css/jquery-ui_1.css" />
        <script>
            $(document).ready(function () {
                $(function () {
                    $("#accordion").accordion();
                });

                $("input[type='checkbox']").prop({
                    disabled: true
                });

                $("input[type='text']").prop({
                    disabled: true
                });

            });
        </script>
    </head>
    <body>
        <input type="hidden" name="existing" id="existing" value="no" />
        <input type="hidden" name="vid" id="vid" value="no" />

        <a href="viewCustomerCheckList?customerid=${sessionScope.CUSTOMERID}" class="view">Back</a> 
        <h2>Service Check List</h2>

        <br />
        <table width="100%" cellpadding="5">

            <tr>
                <td align="left" valign="top">Date</td>
                <td align="left" valign="top">
                    ${servicedtls.date}
                </td>
                <td align="left" valign="top">Customer mobile no.</td>
                <td align="left" valign="top">
                    ${servicedtls.cusmobile}
                </td>
            </tr>


            <tr>
                <td align="left" valign="top">Customer Name</td>
                <td align="left" valign="top">${servicedtls.custname}</td>


                <td width="13%" align="left" valign="top">Vehicle No.(eg: DL 01 C AA 1155)</td>
                <td width="26%" align="left" valign="top">
                    <label for="textfield"></label>
                    ${servicedtls.vehiclenumber}
                </td>
            </tr>

            <tr>
                <td width="13%" align="left" valign="top">Car brand</td>
                <td width="26%" align="left" valign="top"><label for="textfield"></label>
                    ${servicedtls.carbrand}
                </td>
                <td width="23%" align="left" valign="top">Vehicle Model</td>
                <td width="38%" align="left" valign="top">
                    ${servicedtls.carmodel}
                </td>
            </tr>

            <tr><td width="13%" align="left" valign="top">KM. in</td>
                <td width="26%" align="left" valign="top">
                    <label for="textfield"></label>
                    ${servicedtls.km_in}
                </td>
                <td width="23%" align="left" valign="top">VIN No.</td>
                <td width="38%" align="left" valign="top">${servicedtls.vinnumber}</td>
            </tr>

            <tr>
                <td width="13%" align="left" valign="top">Service Booklet</td>
                <td width="26%" align="left" valign="top">
                    <label for="textfield"></label>
                    <input type="checkbox" disabled="" name="servicebooklet" value="checked" ${servicedtls.servicebooklet}/>
                </td>
                <td width="23%" align="left" valign="top">Documents Reg Paper</td>
                <td width="38%" align="left" valign="top">
                    <input type="checkbox" disabled="" name="docregpaper" value="checked" ${servicedtls.docregpaper}/>
                </td>
            </tr>

            <tr>
                <td width="13%" align="left" valign="top">Rim Lock</td>
                <td width="26%" align="left" valign="top">
                    <label for="textfield"></label>
                    <input type="checkbox" disabled="" name="rimlock" value="checked" ${servicedtls.rimlock}/>
                </td>
                <td width="23%" align="left" valign="top">Tool Kit</td>
                <td width="38%" align="left" valign="top">
                    <input type="checkbox" disabled="" name="toolkit" value="checked" ${servicedtls.toolkit}/>
                </td>
            </tr>

            <tr>
                <td width="13%" align="left" valign="top">Old Parts Request</td>
                <td width="26%" align="left" valign="top">
                    <label for="textfield"></label>
                    <input type="checkbox" name="oldpartsrequest" disabled="" value="checked" ${servicedtls.oldpartsrequest}/>
                </td>
                <td width="23%" align="left" valign="top">Fuel Level</td>
                <td width="38%" align="left" valign="top">
                    <select disabled="" name="fuellevel">
                        <c:choose>
                            <c:when test="${servicedtls.fuellevel=='Res'}">
                                <option selected="">Res</option>
                                <option>1/4</option>
                                <option>1/2</option>
                                <option>3/4</option>
                                <option>Full</option>
                            </c:when>
                            <c:when test="${servicedtls.fuellevel=='1/4'}">
                                <option >Res</option>
                                <option selected="">1/4</option>
                                <option>1/2</option>
                                <option>3/4</option>
                                <option>Full</option>
                            </c:when>
                            <c:when test="${servicedtls.fuellevel=='1/2'}">
                                <option>Res</option>
                                <option>1/4</option>
                                <option selected="">1/2</option>
                                <option>3/4</option>
                                <option>Full</option>
                            </c:when>
                            <c:when test="${servicedtls.fuellevel=='3/4'}">
                                <option >Res</option>
                                <option>1/4</option>
                                <option>1/2</option>
                                <option selected=""> 3/4</option>
                                <option>Full</option>
                            </c:when>
                            <c:when test="${servicedtls.fuellevel=='Full'}">
                                <option >Res</option>
                                <option>1/4</option>
                                <option>1/2</option>
                                <option>3/4</option>
                                <option selected="">Full</option>
                            </c:when>
                        </c:choose>
                    </select>
                </td>
            </tr>

            <tr>
                <td width="13%" align="left" valign="top">Driver name</td>
                <td width="26%" align="left" valign="top">
                    <label for="textfield"></label>    
                    ${servicedtls.drivername}
                </td>
                <td width="23%" align="left" valign="top">Driver number</td>
                <td width="38%" align="left" valign="top">
                    <label for="textfield"></label>
                    ${servicedtls.drivernumber}
                </td>
            </tr>

            <!--                <tr>
                                
                                <td align="left" valign="top">Licence No.</td>
                                <td align="left" valign="top"><input type="text" pattern="^[a-zA-Z0-9]*$" title="Please enter a valid Licence No." maxlength="17" name="licensenumber" id="licensenumber" /></td>
                                <td width="23%" align="left" valign="top">&nbsp;</td>
                                <td width="38%" align="left" valign="top">&nbsp;</td>
                            </tr>-->
        </table>
        <!--till nitz-->



        <br />
        <br />

        <div id="accordion">
            <h2 class="">Inside Check</h2>

            <div class="pane" style="display:block">


                <div>
                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td>No Micro Filter &nbsp; <input class="" type="checkbox" name="nomicrofilter" value="checked" ${servicedtls.nomicrofilter}/></td>
                            </tr>
                        </table>
                    </div>
                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">Instrument Lighting  &nbsp; <input type="checkbox" name="instrumentlighting" value="checked" ${servicedtls.instrumentlighting} /></td>
                            </tr>
                        </table>
                    </div>

                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">Steering &nbsp; <input type="checkbox" name="steering" value="checked" ${servicedtls.steering}/></td>
                            </tr>
                        </table>
                    </div>

                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">Micro Filter &nbsp; <input type="checkbox" name="microfilter" value="checked" ${servicedtls.microfilter}/></td>
                            </tr>
                        </table>
                    </div>

                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">Handbrake &nbsp; <input type="checkbox" name="handbrake" value="checked" ${servicedtls.handbrake}/></td>
                            </tr>
                        </table>
                    </div>

                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">Pedal-noise  &nbsp; <input type="checkbox" name="pedalnoise" value="checked"  ${servicedtls.pedalnoise} /></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>

            <h2>Engine Check</h2>

            <div class="pane">
                <!-- <h3>Vestibulum ante ipsum</h3>
                 <p>
                   Cras diam. Donec dolor lacus, vestibulum at, varius in, mollis
                   id, dolor. Aliquam erat volutpat. Praesent pretium tristique
                   est. Maecenas nunc lorem, blandit nec, accumsan nec, facilisis
                   quis, pede. Aliquam erat volutpat. Donec sit amet urna quis
                   nisi elementum fermentum.
                 </p>-->
                <div>

                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137"> Cooling System   &nbsp; <input type="checkbox" name="coolingsystem" value="checked" ${servicedtls.coolingsystem}/></td>
                            </tr>
                        </table>
                    </div>



                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">Brake Fluid &nbsp; <input type="checkbox" name="brakefluid" value="checked" ${servicedtls.brakefluid}/></td>
                            </tr>
                        </table>
                    </div> 


                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">Steering Fluid &nbsp; <input type="checkbox" name="steeringfluid" value="checked" ${servicedtls.steeringfluid}/></td>
                            </tr>
                        </table>
                    </div>

                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">V-belt / Poly V-belt  &nbsp; <input type="checkbox" name="vbelt" value="checked" ${servicedtls.vbelt}/></td>
                            </tr>
                        </table>
                    </div>

                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">Last Inspection</td>
                                <td width="62"><input type="text" name="lastinspection" id="textfield" placeholder="KM" value="${servicedtls.lastinspection}"/></td>
                                <td width="61"></td>
                            </tr>
                        </table>
                    </div>

                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">Cleanwise</td>
                                <td width="62"><input type="text" name="cleanwise" id="textfield" placeholder="Date " value="${servicedtls.cleanwise}"/></td>
                                <td width="61"></td>
                            </tr>
                        </table>
                    </div> 

                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">Noticeable Leaks &nbsp; <input type="checkbox" name="noticableleaks" value="checked" ${servicedtls.noticableleaks}/></td>
                            </tr>
                        </table>
                    </div>



                </div>
            </div>

            <h2>Vehicle Check</h2>

            <div class="pane">
                <!-- <h3>Curabitur vel dolor</h3>
                 <p>
                   Non lectus lacinia egestas. Nulla hendrerit, felis quis
                   elementum viverra, purus felis egestas magna, non vulputate
                   libero justo nec sem. Nullam arcu. Donec pellentesque
                   vestibulum urna. In mauris odio, fringilla commodo, commodo
                   ac, dignissim ac, augue.
                 </p>-->
                <div>

                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137"> Cooling System &nbsp; <input type="checkbox" name="Vcoolingsystem" value="checked" ${servicedtls.Vcoolingsystem} /></td>

                            </tr>
                        </table>
                    </div>

                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">Wiper Blades &nbsp; <input type="checkbox" name="wiperblades" value="checked" ${servicedtls.wiperblades}/></td>
                            </tr>
                        </table>
                    </div>


                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">Window Glass &nbsp; <input type="checkbox" name="windowglass" value="checked" ${servicedtls.windowglass}/></td>
                            </tr>
                        </table>
                    </div>

                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">Body &nbsp; <input type="checkbox" name="body" value="checked" ${servicedtls.body}/></td>
                            </tr>
                        </table>
                    </div>  

                </div>
            </div>


            <!-------====================================================-->


            <h2>Vehicle Check (Half Raised)</h2>
            <div class="pane">
                <!-- <h3>Curabitur vel dolor</h3>
                 <p>
                   Non lectus lacinia egestas. Nulla hendrerit, felis quis
                   elementum viverra, purus felis egestas magna, non vulputate
                   libero justo nec sem. Nullam arcu. Donec pellentesque
                   vestibulum urna. In mauris odio, fringilla commodo, commodo
                   ac, dignissim ac, augue.
                 </p>-->
                <div>

                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">Rear lights / Headlights  &nbsp; <input type="checkbox" name="headlights" value="checked" ${servicedtls.headlights}/></td>
                            </tr>
                        </table>
                    </div>

                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">Shockabsorber &nbsp; <input type="checkbox" name="shockabsorber" value="checked"  ${servicedtls.shockabsorber}/></td>
                            </tr>
                        </table>
                    </div>

                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">Tyre Tread &nbsp; <input type="checkbox" name="tyretread" value="checked"  ${servicedtls.tyretread}/></td>
                            </tr>
                        </table>
                    </div>

                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">Front Brake pads / Discs &nbsp; <input type="checkbox" name="frontbrake" value="checked"  ${servicedtls.frontbrake}/></td>
                            </tr>
                        </table>
                    </div> 

                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">Brake Lines / Hoses &nbsp; <input type="checkbox" name="hoses" value="checked" ${servicedtls.hoses}/></td>
                            </tr>
                        </table>
                    </div>  

                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">Rear Brake Pads / Discs &nbsp; <input type="checkbox" name="rearbrake" value="checked" ${servicedtls.rearbrake}/></td>
                            </tr>
                        </table>
                    </div>  



                </div>
            </div>


            <!-------====================================================-->

            <h2>Vehicle Check (Fully  Raised)</h2>
            <div class="pane">
                <!-- <h3>Curabitur vel dolor</h3>
                 <p>
                   Non lectus lacinia egestas. Nulla hendrerit, felis quis
                   elementum viverra, purus felis egestas magna, non vulputate
                   libero justo nec sem. Nullam arcu. Donec pellentesque
                   vestibulum urna. In mauris odio, fringilla commodo, commodo
                   ac, dignissim ac, augue.
                 </p>-->
                <div>

                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">Exhaust System &nbsp; <input type="checkbox" name="exhaustsystem" value="checked" ${servicedtls.exhaustsystem}/></td>
                            </tr>
                        </table>
                    </div>

                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">Rear Axle &nbsp; <input type="checkbox" name="rearaxle" value="checked" ${servicedtls.rearaxle}/></td>
                            </tr>
                        </table>
                    </div>

                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">Gear Box / Leaking  &nbsp; <input type="checkbox" name="gearbox" value="checked" ${servicedtls.gearbox}/></td>
                            </tr>
                        </table>
                    </div> 


                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">Fuel Tank / Lines  &nbsp; <input type="checkbox" name="fueltank" value="checked" ${servicedtls.fueltank}/></td>
                            </tr>
                        </table>
                    </div>

                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137"> Cooling System &nbsp; <input type="checkbox" name="Vfullyraisedcoolingsystem" value="checked" ${servicedtls.Vfullyraisedcoolingsystem}/></td>
                            </tr>
                        </table>
                    </div>

                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">Final Drive / Leaking &nbsp; <input type="checkbox" name="finaldrive" value="checked" ${servicedtls.finaldrive}/></td>
                            </tr>
                        </table>
                    </div>

                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">Front Axle  &nbsp; <input type="checkbox" name="frontaxle" value="checked" ${servicedtls.frontaxle}/></td>
                            </tr>
                        </table>
                    </div>   

                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">Engine Leaks &nbsp; <input type="checkbox" name="engineleaks" value="checked" ${servicedtls.engineleaks}/></td>
                            </tr>
                        </table>
                    </div>      

                </div>
            </div>


            <!-------====================================================-->

            <h2>Car Wash</h2>
            <div class="pane">
                <!-- <h3>Curabitur vel dolor</h3>
                 <p>
                   Non lectus lacinia egestas. Nulla hendrerit, felis quis
                   elementum viverra, purus felis egestas magna, non vulputate
                   libero justo nec sem. Nullam arcu. Donec pellentesque
                   vestibulum urna. In mauris odio, fringilla commodo, commodo
                   ac, dignissim ac, augue.
                 </p>-->
                <div>

                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137"> Cooling System &nbsp; <input type="checkbox" name="carwashcoolingsystem" value="checked" ${servicedtls.carwashcoolingsystem}/></td>
                            </tr>
                        </table>
                    </div>

                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">Exterior Polish  &nbsp; <input type="checkbox" name="exteriorpolish" value="checked" ${servicedtls.exteriorpolish}/></td>
                            </tr>
                        </table>
                    </div>



                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">Interior Cleaning &nbsp; <input type="checkbox" name="interiorcleaning" value="checked" ${servicedtls.interiorcleaning}/></td>
                            </tr>
                        </table>
                    </div>


                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">Wheel Rim Cleaning &nbsp; <input type="checkbox" name="wheelrimcleaning" value="checked" ${servicedtls.wheelrimcleaning}/></td>
                            </tr>
                        </table>
                    </div>

                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">Body Protection &nbsp; <input type="checkbox" name="bodyprotection" value="checked" ${servicedtls.bodyprotection}/></td>
                            </tr>
                        </table>
                    </div>

                    <div class="checkbox_style">
                        <table width="274" border="0">
                            <tr>
                                <td width="137">Anti-Rust Treatment  &nbsp; <input type="checkbox" name="antirust" value="checked" ${servicedtls.antirust}/></td>
                            </tr>
                        </table>
                    </div>



                </div>
            </div>


            <!-------====================================================-->


            <h2>Additional Work </h2>
            <div class="pane">
                <!-- <h3>Curabitur vel dolor</h3>
                 <p>
                   Non lectus lacinia egestas. Nulla hendrerit, felis quis
                   elementum viverra, purus felis egestas magna, non vulputate
                   libero justo nec sem. Nullam arcu. Donec pellentesque
                   vestibulum urna. In mauris odio, fringilla commodo, commodo
                   ac, dignissim ac, augue.
                 </p>-->
                <div>
                    <div class="checkbox_style"> 
                        Comment the addition task done
                        <br/><br/>
                        <textarea disabled="" name="additionalwork" cols="100" rows="10">${servicedtls.additionalwork}</textarea>
                    </div>


                </div>
            </div>

        </div>


        <br />
    <center>
        
    </center> 
    <input type="hidden" name="id" value="${servicedtls.cvid}" />
    <input type="hidden" name="cvdid" value="${servicedtls.cvdid}" />
    <input type="hidden" name="brandid" id="brandid" value="${servicedtls.brandid}" />
    <input type="hidden" name="branddetailid" id="branddetailid" value="${servicedtls.branddetailid}" />
</body>
</html>
