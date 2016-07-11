/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.main.controller;

import com.google.gson.Gson;
import com.main.model.Branch;
import com.main.model.Brand;
import com.main.model.BrandDetails;
import com.main.model.CarPartInfo;
import com.main.model.CarPartVault;
import com.main.model.CarParts;
import com.main.model.Category;
import com.main.model.Customer;
import com.main.model.CustomerVehicles;
import com.main.model.Enquiries;
import com.main.model.EstimateDetails;
import com.main.model.Followups;
import com.main.model.Inventory;
import com.main.model.Invoice;
import com.main.model.Jobsheet;
import com.main.model.Manufacturer;
import com.main.model.LabourServices;
import com.main.model.Taxes;
import com.main.model.UserDetails;
import com.main.model.Vendor;
import com.main.model.Workman;
import com.main.service.AllInsertService;
import com.main.service.AllViewService;
import com.main.sync.Synchronization;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author krisnela
 */
@Controller
public class AllViewController {

    @Autowired
    AllViewService viewService;

    @Autowired
    AllInsertService insertService;

    @Autowired
    Environment env;

    @RequestMapping(value = {"/", "Login"})
    public String redirectdemo() {
        return "Login";
    }

    //verify customer login
    @RequestMapping(value = "verifylogin", method = RequestMethod.POST)
    public ModelAndView verifylogin(@RequestParam(value = "mobilenumber") String mobilenumber, @RequestParam(value = "password") String password, HttpSession session) {
        ModelAndView modelAndView = null;
        List<Customer> customerlist = viewService.getanyhqldatalist("from customer where mobilenumber='" + mobilenumber + "' and password='" + password + "' and isdelete<>'Yes'");
        if (customerlist != null && customerlist.size() > 0 && customerlist.get(0).getMobilenumber().equals(mobilenumber) && customerlist.get(0).getPassword().equals(password)) {
            session.setAttribute("CUSTOMERID", customerlist.get(0).getId());
            session.setAttribute("CUSTOMERNAME", customerlist.get(0).getName());
            modelAndView = new ModelAndView("redirect:viewReminderGridLink?customerid=" + customerlist.get(0).getId());

        } else {
            modelAndView = new ModelAndView("Login", "errmsg", "Authentication error please check your username/password");
        }
        return modelAndView;
    }

    //view custome master customers service history and available cars 
    @RequestMapping(value = "viewCustomerDetailsLink")
    public ModelAndView viewCustomerDetailsLink(@RequestParam(value = "customerid") String customerid) {
        ModelAndView modelAndView = new ModelAndView("ViewCustomerDetails");
        modelAndView.addObject("customerprofile", viewService.getspecifichqldata(Customer.class, customerid));
        modelAndView.addObject("customerdetails", viewService.getanyjdbcdatalist("select bdd.vehiclename as carmodel,bd.name as carbrand,iv.vehiclenumber,count(vehiclenumber) as times from invoice iv \n"
                + "inner join branddetails bdd on bdd.id=iv.vehicleid \n"
                + "inner join brand bd on bd.id=bdd.brandid\n"
                + "inner join customer cu on cu.mobilenumber=iv.customermobilenumber\n"
                + "where cu.id='"+customerid+"' and iv.isdelete='No' group by vehiclenumber"));
//        modelAndView.addObject("customerdetails", viewService.getanyjdbcdatalist("SELECT *,count(vehiclenumber) as times FROM customervehicles where custid='" + customerid + "' group by vehiclenumber"));
        return modelAndView;
    }

    //view custome master customers service history and available cars --basically has now become the customer dashboard in customer module!
    @RequestMapping(value = "viewCustomerProfileLink")
    public ModelAndView viewCustomerProfileLink(@RequestParam(value = "customerid") String customerid) {
        ModelAndView modelAndView = new ModelAndView("ViewCustomerProfile");
        modelAndView.addObject("customerprofile", viewService.getspecifichqldata(Customer.class, customerid));
        return modelAndView;
    }

    @RequestMapping(value = "viewReminderGridLink")
    public ModelAndView viewReminderGridLink(@RequestParam(value = "customerid") String customerid) {
        ModelAndView modelAndView = new ModelAndView("ViewCustomerReminder");
        modelAndView.addObject("messagedetails", viewService.getanyjdbcdatalist("SELECT rc.date_time,rc.id as rcid,LEFT(rc.message, 15) as mymessage,bdd.vehiclename FROM reminder_customer rc\n"
                + "inner join branddetails bdd on bdd.id=rc.branddetailid\n"
                + "where rc.customerid='" + customerid + "' and rc.isdelete='No' order by length(rc.id) desc,rc.id desc"));
        return modelAndView;
    }

    //get customer details on customer reminder page
    @RequestMapping(value = "getReminderCustomerDetails", method = RequestMethod.POST)
    public void getReminderCustomerDetails(@RequestParam(value = "rcid") String rcid, HttpServletResponse response) throws IOException {
        String jsondata = "";
        List<Map<String, Object>> customerdetail = viewService.getanyjdbcdatalist("select * from reminder_customer where id='" + rcid + "'");
        jsondata = new Gson().toJson(customerdetail);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(jsondata);
    }

    @RequestMapping("/logout")
    public String logout(HttpServletRequest request) {
        if (request.getSession().getAttribute("CUSTOMERNAME") != null) {
            request.getSession().invalidate();

            return "redirect:/Login";
        }
        return "redirect:/Login";
    }

    @RequestMapping(value = "viewEstimateGridLink")
    public ModelAndView viewEstimateGridLink(@RequestParam(value = "customerid") String customerid) {
        ModelAndView modelAndView = new ModelAndView("ViewEstimateGrid");
        modelAndView.addObject("estimatedtls", viewService.getanyjdbcdatalist("SELECT est.isjobsheetready, est.id as estid,est.approval,cu.name as custname,cv.carmodel,cv.vehiclenumber,est.savedate,est.confirm_estimate FROM estimate est\n"
                + "inner join customervehicles cv on cv.id=est.cvid\n"
                + "inner join customer cu on cu.id=cv.custid\n"
                + "where cu.id='" + customerid + "' and est.confirm_estimate='Yes' order by length(est.id) desc,est.id desc"));
        return modelAndView;
    }

    //===================customer===========
    //remember to get estimate id list based on customer id and then pass value here
    @RequestMapping(value = "estimategridlink")
    public ModelAndView estimategridlink(@RequestParam(value = "estimateid") String estid) {
        ModelAndView modelAndView = new ModelAndView("CustomerViewEstimate");
        modelAndView.addObject("estcustdtls", viewService.getanyjdbcdatalist("SELECT est.id as estimateid,cv.id as cvid,pcl.date as pcldate,pcl.id as pclid,cu.name as customername,cv.carmodel as carmodel,cv.vehiclenumber as vehiclenumber \n"
                + "FROM estimate est\n"
                + "left join pointchecklist pcl on pcl.id=est.pclid\n"
                + "left join customervehicles cv on cv.id=pcl.customervehiclesid\n"
                + "left join customer cu on cu.id=cv.custid\n"
                + "where est.id='" + estid + "'").get(0));

        modelAndView.addObject("estpartdtls", viewService.getanyjdbcdatalist("select ed.*,ed.partrs,ed.labourrs,ed.description,ed.partlistname as partname,ed.id as edid from estimatedetails ed\n"
                + "inner join estimate est on est.id=ed.estimateid\n"
                + "inner join carpartinfo cpi on cpi.id=ed.partlistid\n"
                + "inner join carpartvault cpv on cpv.id=cpi.vaultid\n"
                + "where ed.estimateid='" + estid + "' and ed.isdelete='No' and ed.item_type='part'"));

        modelAndView.addObject("estservicedtls", viewService.getanyjdbcdatalist("SELECT estd.id as estdid,estd.partlistid,estd.partlistname as servicename,estd.description,estd.labourrs\n"
                + "FROM estimatedetails estd\n"
                + "inner join labourservices ls on ls.id=estd.partlistid\n"
                + "where estd.estimateid='" + estid + "' and estd.isdelete='No' and estd.item_type='service'\n"
                + "order by estd.partlistid desc"));

        return modelAndView;
    }

    //view estimate page
    @RequestMapping("estimate-view")
    public ModelAndView estimateView(@RequestParam(value = "estid") String estid) {
        ModelAndView modelAndView = new ModelAndView("ViewEstimate");
        modelAndView.addObject("estcustdtls", viewService.getanyjdbcdatalist("SELECT est.id as estimateid,pcl.date as pcldate,pcl.id as pclid,cu.name as customername,cv.carmodel as carmodel,cv.vehiclenumber as vehiclenumber,est.approval \n"
                + "FROM estimate est\n"
                + "left join pointchecklist pcl on pcl.id=est.pclid\n"
                + "left join customervehicles cv on cv.id=pcl.customervehiclesid\n"
                + "left join customer cu on cu.id=cv.custid\n"
                + "where est.id='" + estid + "'").get(0));

        modelAndView.addObject("estpartdtls", viewService.getanyjdbcdatalist("select ed.*,ed.partrs,ed.labourrs,ed.description,ed.partlistname as partname from estimatedetails ed\n"
                + "inner join estimate est on est.id=ed.estimateid\n"
                + "inner join carpartinfo cpi on cpi.id=ed.partlistid\n"
                + "inner join carpartvault cpv on cpv.id=cpi.vaultid\n"
                + "where ed.estimateid='" + estid + "' and ed.isdelete='No' and ed.item_type='part'"));

        modelAndView.addObject("estservicedtls", viewService.getanyjdbcdatalist("SELECT estd.id as estdid,estd.partlistid,estd.partlistname as servicename,estd.description,estd.labourrs\n"
                + "FROM estimatedetails estd\n"
                + "inner join labourservices ls on ls.id=estd.partlistid\n"
                + "where estd.estimateid='" + estid + "' and estd.isdelete='No' and estd.item_type='service'\n"
                + "order by estd.partlistid desc"));

        return modelAndView;
    }

    //redirect to invoice popup with invoice list for vehicles
    @RequestMapping(value = "getInvoiceDetails", method = RequestMethod.POST)
    public void getInvoiceDetails(@RequestParam(value = "vehiclenumber") String vehiclenumber, HttpServletResponse response) throws IOException {
        String jsondata = "";
        List<Map<String, Object>> getLimitList = viewService.getanyjdbcdatalist("SELECT inv.id as invoiceid,inv.vehiclenumber,inv.savedate as servicedate\n"
                + "FROM invoice inv\n"
                + "WHERE inv.vehiclenumber='" + vehiclenumber + "' and inv.isdelete='No'\n"
                + "group by inv.id");
        jsondata = new Gson().toJson(getLimitList);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(jsondata);
    }

    //view estimate page
//    @RequestMapping("viewApprovedLink")
//    public ModelAndView viewApprovedLink(@RequestParam(value = "estid") String estid) {
//        ModelAndView modelAndView = new ModelAndView("ViewApprovedEstimate");
//        modelAndView.addObject("estcustdtls", viewService.getanyjdbcdatalist("SELECT est.id as estimateid,pcl.date as pcldate,pcl.id as pclid,cu.name as customername,cv.carmodel as carmodel,cv.vehiclenumber as vehiclenumber \n"
//                + "FROM estimate est\n"
//                + "left join pointchecklist pcl on pcl.id=est.pclid\n"
//                + "left join customervehicles cv on cv.id=pcl.customervehiclesid\n"
//                + "left join customer cu on cu.id=cv.custid\n"
//                + "where est.id='" + estid + "'").get(0));
//
//        modelAndView.addObject("estpartdtls", viewService.getanyjdbcdatalist("select ed.*,ed.partrs,ed.labourrs,ed.description,cpv.name as partname from estimatedetails ed\n"
//                + "inner join estimate est on est.id=ed.estimateid\n"
//                + "inner join carpartinfo cpi on cpi.id=ed.partlistid\n"
//                + "inner join carpartvault cpv on cpv.id=cpi.vaultid\n"
//                + "where ed.estimateid='" + estid + "' and ed.isdelete='No' and ed.approval='Yes'"));
//
//        return modelAndView;
//    }
    //view approved 
    @RequestMapping(value = "viewApprovedLink")
    public ModelAndView viewApprovedLink(@RequestParam(value = "estid") String estid) {
        ModelAndView modelAndView = new ModelAndView("ViewApprovedEstimate");
        modelAndView.addObject("estcustdtls", viewService.getanyjdbcdatalist("SELECT est.id as estimateid,cv.id as cvid,pcl.date as pcldate,pcl.id as pclid,cu.name as customername,cv.carmodel as carmodel,cv.vehiclenumber as vehiclenumber \n"
                + "FROM estimate est\n"
                + "left join pointchecklist pcl on pcl.id=est.pclid\n"
                + "left join customervehicles cv on cv.id=pcl.customervehiclesid\n"
                + "left join customer cu on cu.id=cv.custid\n"
                + "where est.id='" + estid + "'").get(0));

        modelAndView.addObject("estpartdtls", viewService.getanyjdbcdatalist("select ed.*,ed.partrs,ed.labourrs,ed.description,cpv.name as partname,ed.id as edid from estimatedetails ed\n"
                + "inner join estimate est on est.id=ed.estimateid\n"
                + "inner join carpartinfo cpi on cpi.id=ed.partlistid\n"
                + "inner join carpartvault cpv on cpv.id=cpi.vaultid\n"
                + "where ed.estimateid='" + estid + "' and ed.approval='Yes'"));

        modelAndView.addObject("estservicedtls", viewService.getanyjdbcdatalist("SELECT estd.id as estdid,estd.partlistid,estd.partlistname as servicename,estd.description,estd.labourrs\n"
                + "FROM estimatedetails estd\n"
                + "inner join labourservices ls on ls.id=estd.partlistid\n"
                + "where estd.estimateid='" + estid + "' and estd.isdelete='No' and estd.item_type='service'\n"
                + "order by estd.partlistid desc"));

        return modelAndView;
    }

    //view Service Check List grid page
    @RequestMapping(value = "viewCustomerCheckList")
    public ModelAndView viewCustomerCheckList(@RequestParam(value = "customerid") String customerid) {
        ModelAndView modelAndView = new ModelAndView("ServiceCheckList");
        modelAndView.addObject("servicedtls", viewService.getanyjdbcdatalist("SELECT cv.*,c.name,cvd.id as cvdid FROM customervehicles cv\n"
                + "inner join customervehiclesdetails cvd on cvd.custvehicleid=cv.id\n"
                + "inner join customer c on cv.custid=c.id where cv.isdelete='No' and cv.custid='" + customerid + "' order by cv.savedate desc"));
        return modelAndView;
    }

    //edit service checklist link redirects to service checklist page
    @RequestMapping(value = "viewServiceCheckList")
    public ModelAndView viewServiceCheckList(@RequestParam(value = "id") String id, String bdid) {
        ModelAndView modelAndView = new ModelAndView("ViewServiceCheckList");
        modelAndView.addObject("custdtls", viewService.getanyhqldatalist("from customer"));
        modelAndView.addObject("servicedtls", viewService.getanyjdbcdatalist("SELECT *,cv.id as cvid,cvd.id as cvdid,c.name as custname,c.mobilenumber as cusmobile FROM customervehicles cv\n"
                + "left join customervehiclesdetails cvd on cvd.custvehicleid=cv.id\n"
                + "left join customer c on c.id=cv.custid\n"
                + "where cv.isdelete<>'Yes' and cv.id='" + id + "'").get(0));
        modelAndView.addObject("brand", viewService.getanyhqldatalist("from brand where isdelete<>'Yes'"));
        modelAndView.addObject("branddetails", viewService.getanyhqldatalist("from branddetails where isdelete<>'Yes' and brandid='" + bdid + "'"));
        return modelAndView;
    }
    
    //redirects to view customer invoice page
    //redirects to  Customer Insurance invoice page
    @RequestMapping("viewCustomerInvoice")
    public ModelAndView viewCustomerInsuranceInvoice(@RequestParam(value = "invoiceid") String invoiceId) {
        ModelAndView modelAndView = new ModelAndView("ViewCustomerInsuranceInvoice");
        modelAndView.addObject("vatDetails", viewService.getanyhqldatalist("from taxes where isdelete<>'Yes' and id in('LTX1','LTX2')"));

        //view invoice data required for getting data
        List<Map<Object, String>> invoicemap = viewService.getanyjdbcdatalist("SELECT iv.*,bd.vehiclename,bdd.name as make\n"
                + "FROM invoice iv\n"
                + "left join branddetails bd on bd.id=iv.vehicleid\n"
                + "left join brand bdd on bdd.id=bd.brandid\n"
                + "where iv.id='" + invoiceId + "'");

        modelAndView.addObject("invoiceDt", invoicemap.get(0));

        if (invoicemap.get(0).get("isinsurance").equals("Yes")) {
            if (invoicemap.get(0).get("insurancetype").equals("Full Payment")) {
                modelAndView.addObject("insuranceinvoiceDt", viewService.getanyjdbcdatalist("SELECT CAST(iv.sparepartsfinal AS UNSIGNED)+ CAST(iv.labourfinal AS UNSIGNED) as claimtotal,\n"
                        + "CAST(iv.taxAmount1 AS UNSIGNED)+ CAST(iv.taxAmount2 AS UNSIGNED) as taxtotal,\n"
                        + "CAST(iv.labourfinal AS UNSIGNED)+CAST(iv.sparepartsfinal AS UNSIGNED)+CAST(iv.taxAmount1 AS UNSIGNED)+ CAST(iv.taxAmount2 AS UNSIGNED) as grandtotal\n"
                        + "FROM invoice iv\n"
                        + "where iv.id='" + invoiceId + "'").get(0));
            }
        }

        Invoice invoicemobile = (Invoice) viewService.getspecifichqldata(Invoice.class, invoiceId);
        String custnumber = invoicemobile.getCustomermobilenumber();

        modelAndView.addObject("customerinvoiceDt", viewService.getanyjdbcdatalist("SELECT inv.*,cu.*\n"
                + "FROM invoice inv\n"
                + "left join customer cu on cu.mobilenumber=inv.customermobilenumber\n"
                + "where cu.mobilenumber='" + custnumber + "'\n"
                + "group by cu.mobilenumber").get(0));

        //normal inovice create ka view[carparts]
        modelAndView.addObject("labourandpartdt", viewService.getanyjdbcdatalist("SELECT i.*,i.partname as itemname,mfg.name as mfgname \n"
                + "FROM invoicedetails i \n"
                + "left join  carpartinfo cpi on cpi.id=i.partid\n"
                + "left join  carpartvault cpv on cpv.id=cpi.vaultid\n"
                + "left join  manufacturer mfg on mfg.id=i.manufacturerid \n"
                + "where i.invoiceid='" + invoiceId + "' and i.isdelete='No'"));
        //convert ka labour info
        modelAndView.addObject("labourinventorydt", viewService.getanyjdbcdatalist("SELECT *,servicename as name FROM labourinventory\n"
                + "where invoiceid='" + invoiceId + "' and isdelete='No' and total>0"));
        return modelAndView;

    }
    
//    @RequestMapping("viewCustomerInvoice")
//    public ModelAndView viewCustomerInvoice(@RequestParam(value = "invoiceid") String invoiceId) {
//        ModelAndView modelAndView = new ModelAndView("ViewCustomerInvoice");
//        modelAndView.addObject("vatDetails", viewService.getanyhqldatalist("from taxes where isdelete<>'Yes' and id in('LTX1','LTX2')"));
//
//        //view invoice data required for getting data
//        List<Map<Object, String>> invoicemap = viewService.getanyjdbcdatalist("SELECT iv.*,bd.vehiclename  \n"
//                + "FROM invoice iv\n"
//                + "left join branddetails bd on bd.id=iv.vehicleid\n"
//                + "where iv.id='" + invoiceId + "'");
//
//        modelAndView.addObject("invoiceDt", invoicemap.get(0));
//
//        Invoice invoicemobile = (Invoice) viewService.getspecifichqldata(Invoice.class, invoiceId);
//        String custnumber = invoicemobile.getCustomermobilenumber();
//
//        modelAndView.addObject("customerinvoiceDt", viewService.getanyjdbcdatalist("SELECT inv.*,cu.*\n"
//                + "FROM invoice inv\n"
//                + "left join customer cu on cu.mobilenumber=inv.customermobilenumber\n"
//                + "where cu.mobilenumber='" + custnumber + "'\n"
//                + "group by cu.mobilenumber").get(0));
//
//        //normal inovice create ka view[carparts]
//        modelAndView.addObject("labourandpartdt", viewService.getanyjdbcdatalist("SELECT i.*,i.partname as itemname,mfg.name as mfgname \n"
//                + "FROM invoicedetails i \n"
//                + "left join  carpartinfo cpi on cpi.id=i.partid\n"
//                + "left join  carpartvault cpv on cpv.id=cpi.vaultid\n"
//                + "left join  manufacturer mfg on mfg.id=i.manufacturerid \n"
//                + "where i.invoiceid='" + invoiceId + "' and i.isdelete='No'"));
//
//        //convert to invoice ka part view
////        modelAndView.addObject("labourandpartdt", viewService.getanyjdbcdatalist("SELECT i.*,cpv.name as itemname,mfg.name as mfgname\n"
////                + "FROM inventory i\n"
////                + "left join  carpartvault cpv on cpv.id=i.partid\n"
////                + "left join  manufacturer mfg on mfg.id=i.manufacturerid\n"
////                + "where i.invoiceid='" + invoiceId + "' and i.isdelete='No'"));
//        //normal create k time pe
////        modelAndView.addObject("labourinventorydt", viewService.getanyjdbcdatalist("SELECT li.*,ls.name FROM labourinventory li\n"
////                + "left join  labourservices ls on ls.id=li.serviceid\n"
////                + "where li.invoiceid='" + invoiceId + "' and li.isdelete='No'"));
//        //convert ka labour info
//        modelAndView.addObject("labourinventorydt", viewService.getanyjdbcdatalist("SELECT *,servicename as name FROM labourinventory\n"
//                + "where invoiceid='" + invoiceId + "' and isdelete='No'"));
//        return modelAndView;
//
//    }
    

}
