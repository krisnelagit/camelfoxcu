/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.main.controller;

import com.main.mailer.EmailSessionBean;
import com.main.mailer.UploadPdf;
import com.main.model.AllArrayPojo;
import com.main.model.Appointment;
import com.main.model.ApprovalLimit;
import com.main.model.BankAccount;
import com.main.model.Branch;
import com.main.model.Brand;
import com.main.model.BrandDetails;
import com.main.model.CarPartInfo;
import com.main.model.CarPartVault;
import com.main.model.CarParts;
import com.main.model.Category;
import com.main.model.Customer;
import com.main.model.CustomerAdvance;
import com.main.model.CustomerVehicles;
import com.main.model.CustomerVehiclesDeatils;
import com.main.model.Enquiries;
import com.main.model.Estimate;
import com.main.model.EstimateDetails;
import com.main.model.Feedback;
import com.main.model.Followups;
import com.main.model.GeneralExpense;
import com.main.model.GeneralIncome;
import com.main.model.Insurance;
import com.main.model.InsuranceCompany;
import com.main.model.Inventory;
import com.main.model.InventoryArray;
import com.main.model.Invoice;
import com.main.model.Invoicedetails;
import com.main.model.Jobsheet;
import com.main.model.JobsheetDetails;
import com.main.model.LabourInventory;
import com.main.model.Manufacturer;
import com.main.model.LabourServices;
import com.main.model.Ledger;
import com.main.model.LedgerGroup;
import com.main.model.Payment;
import com.main.model.PointChecklist;
import com.main.model.PointChecklistDetails;
import com.main.model.PurchaseOrder;
import com.main.model.PurchaseOrderArray;
import com.main.model.PurchaseOrderReceived;
import com.main.model.PurchaseorderDetails;
import com.main.model.TaskBoard;
import com.main.model.Taxes;
import com.main.model.Vendor;
import com.main.model.Workman;
import com.main.service.AllInsertService;
import com.main.service.AllUpdateService;
import com.main.service.AllViewService;
import java.io.File;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.Scope;
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
//@propertys
@Controller
@PropertySource("classpath:keyidconfig.properties")
public class AllInsertController {
    
    @Autowired
    AllInsertService insertService;
    
    @Autowired
    AllViewService viewService;
    
    @Autowired
    AllUpdateService updateService;
    
    @Autowired
    Environment env;
    
    //========================customer insert==============
    //add approved
    @RequestMapping(value = "addapproved")
    public String addapproved(@RequestParam(value = "estimatedetails") String[] estimateDetails, @RequestParam(value = "estimateid") String estimateid,HttpSession session) {

        if (estimateDetails.length > 0) {
            updateService.updateanyhqlquery("update estimate set approval='Yes',modifydate=now() where id='" + estimateid + "'");

            for (int i = 0; i < estimateDetails.length; i++) {
                updateService.updateanyhqlquery("update estimatedetails set approval='Yes',modifydate=now() where id='" + estimateDetails[i] + "'");
            }
        } else {

        }
        return "redirect:viewEstimateGridLink?customerid="+session.getAttribute("CUSTOMERID");
    }

//    String prefixcarpartvault = env.getProperty("carpartvault");
//    String prefixcarpartinfo = env.getProperty("carpartinfo");
//     String prefixcustomer = env.getProperty("customer");
//    String prefixcarpartvault=env.getProperty("carpartvault");
//    String prefixcarpartvault=env.getProperty("carpartvault");
    //insert to car parts
    @RequestMapping(value = "insertcarparts", method = RequestMethod.POST)
    public String insertcarparts(@ModelAttribute CarPartVault carPartVault) {
        String pre = env.getProperty("carpartvault");
        String id = pre + insertService.getmaxcount("carpartvault", "id", 5);
        carPartVault.setId(id);
        
        insertService.insert(carPartVault);

        //adds to brand for the new Car Part inserted
        List<BrandDetails> brandDetailsList = viewService.getanyhqldatalist("from branddetails where isdelete='No'");
        for (int i = 0; i < brandDetailsList.size(); i++) {
            CarPartInfo carPartInfo = new CarPartInfo();
            carPartInfo.setBranddetailid(brandDetailsList.get(i).getId());
            carPartInfo.setVaultid(id);
            String pre2 = env.getProperty("carpartinfo");
            String carPartInfoid = insertService.getmaxcount("carpartinfo", "id", 5);
            String maxCountCarPartInfoid = pre2 + carPartInfoid;
            carPartInfo.setId(maxCountCarPartInfoid);
            carPartInfo.setBalancequantity("0");
            insertService.insert(carPartInfo);
        }
        
        return "redirect:viewVehicleList";
    }

}