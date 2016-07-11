/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.main.model;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author user
 */
@Entity(name = "invoice")
@Table(name = "invoice")
public class Invoice {
    @Id
    private String id;
    @Column(insertable = false,updatable = false)
    private String savedate;
    private String customermobilenumber,balanceamount,ispaid="No",sundry_debitors,sparepartsfinal,labourfinal,vehicleid,vehiclenumber,isinsurance="No",insurancecompany,insurancetype,claimnumber,claimcharges,taxAmount1,taxAmount2,amountTotal,isdelete="No",modifydate=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());

    public Invoice() {
    }

    public String getSavedate() {
        return savedate;
    }

    public void setSavedate(String savedate) {
        this.savedate = savedate;
    }        

    public Invoice(String id, String savedate, String customermobilenumber, String balanceamount, String sundry_debitors, String sparepartsfinal, String labourfinal, String vehicleid, String vehiclenumber, String insurancecompany, String insurancetype, String claimnumber, String claimcharges, String taxAmount1, String taxAmount2, String amountTotal) {
        this.id = id;
        this.savedate = savedate;
        this.customermobilenumber = customermobilenumber;
        this.balanceamount = balanceamount;
        this.sundry_debitors = sundry_debitors;
        this.sparepartsfinal = sparepartsfinal;
        this.labourfinal = labourfinal;
        this.vehicleid = vehicleid;
        this.vehiclenumber = vehiclenumber;
        this.insurancecompany = insurancecompany;
        this.insurancetype = insurancetype;
        this.claimnumber = claimnumber;
        this.claimcharges = claimcharges;
        this.taxAmount1 = taxAmount1;
        this.taxAmount2 = taxAmount2;
        this.amountTotal = amountTotal;
    }

    public String getSundry_debitors() {
        return sundry_debitors;
    }

    public void setSundry_debitors(String sundry_debitors) {
        this.sundry_debitors = sundry_debitors;
    } 

    public String getBalanceamount() {
        return balanceamount;
    }

    public void setBalanceamount(String balanceamount) {
        this.balanceamount = balanceamount;
    }    

    public String getIspaid() {
        return ispaid;
    }

    public void setIspaid(String ispaid) {
        this.ispaid = ispaid;
    }

    public String getSparepartsfinal() {
        return sparepartsfinal;
    }

    public void setSparepartsfinal(String sparepartsfinal) {
        this.sparepartsfinal = sparepartsfinal;
    }
    
    public String getLabourfinal() {
        return labourfinal;
    }

    public void setLabourfinal(String labourfinal) {
        this.labourfinal = labourfinal;
    }
    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCustomermobilenumber() {
        return customermobilenumber;
    }

    public void setCustomermobilenumber(String customermobilenumber) {
        this.customermobilenumber = customermobilenumber;
    }

    public String getVehicleid() {
        return vehicleid;
    }

    public void setVehicleid(String vehicleid) {
        this.vehicleid = vehicleid;
    }
    
    public String getVehiclenumber() {
        return vehiclenumber;
    }

    public void setVehiclenumber(String vehiclenumber) {
        this.vehiclenumber = vehiclenumber;
    }

    public String getIsinsurance() {
        return isinsurance;
    }

    public void setIsinsurance(String isinsurance) {
        this.isinsurance = isinsurance;
    }

    public String getInsurancecompany() {
        return insurancecompany;
    }

    public void setInsurancecompany(String insurancecompany) {
        this.insurancecompany = insurancecompany;
    }

    public String getInsurancetype() {
        return insurancetype;
    }

    public void setInsurancetype(String insurancetype) {
        this.insurancetype = insurancetype;
    }

    public String getClaimnumber() {
        return claimnumber;
    }

    public void setClaimnumber(String claimnumber) {
        this.claimnumber = claimnumber;
    }

    public String getClaimcharges() {
        return claimcharges;
    }

    public void setClaimcharges(String claimcharges) {
        this.claimcharges = claimcharges;
    }

    public String getTaxAmount1() {
        return taxAmount1;
    }

    public void setTaxAmount1(String taxAmount1) {
        this.taxAmount1 = taxAmount1;
    }

    public String getTaxAmount2() {
        return taxAmount2;
    }

    public void setTaxAmount2(String taxAmount2) {
        this.taxAmount2 = taxAmount2;
    }

    public String getAmountTotal() {
        return amountTotal;
    }

    public void setAmountTotal(String amountTotal) {
        this.amountTotal = amountTotal;
    }

    public String getIsdelete() {
        return isdelete;
    }

    public void setIsdelete(String isdelete) {
        this.isdelete = isdelete;
    }

    public String getModifydate() {
        return modifydate;
    }

    public void setModifydate(String modifydate) {
        this.modifydate = modifydate;
    }

    
}
