/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.main.controller;

import com.google.gson.Gson;
import com.main.model.AllArrayPojo;
import com.main.model.ApprovalLimit;
import com.main.model.BankAccount;
import com.main.model.Branch;
import com.main.model.Brand;
import com.main.model.BrandDetails;
import com.main.model.CarPartInfo;
import com.main.model.CarPartVault;
import com.main.model.CarParts;
import com.main.model.Category;
import com.main.model.CleaningDto;
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
import com.main.model.JobsheetDetails;
import com.main.model.LabourInventory;
import com.main.model.Manufacturer;
import com.main.model.LabourServices;
import com.main.model.Ledger;
import com.main.model.LedgerGroup;
import com.main.model.PointChecklistDetails;
import com.main.model.PurchaseOrder;
import com.main.model.PurchaseOrderArray;
import com.main.model.PurchaseorderDetails;
import com.main.model.TaskBoard;
import com.main.model.Taxes;
import com.main.model.UpdateInventoryArray;
import com.main.model.Vendor;
import com.main.model.Workman;
import com.main.service.AllInsertService;
import com.main.service.AllUpdateService;
import com.main.service.AllViewService;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
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
@PropertySource("classpath:keyidconfig.properties")
public class AllUpdateController {

    static int tempqty = 0;

    @Autowired
    AllUpdateService updateService;

    @Autowired
    AllViewService viewService;

    @Autowired
    AllInsertService insertService;

    @Autowired
    Environment env;

    //update car parts details
    @RequestMapping(value = "updatecarparts", method = RequestMethod.POST)
    public String updatecarparts(@ModelAttribute CarPartVault carPartVault) {
        updateService.update(carPartVault);
        return "redirect:viewVehicleList";
    }

}