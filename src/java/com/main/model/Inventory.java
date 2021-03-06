/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.main.model;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author pc2
 */
@Entity(name = "inventory")
@Table(name = "inventory")
public class Inventory {
    @Id
    private String id;
    private String invoiceid,insurancepercent,insurancecompanyamount,insurancecustomeramount,total,type,manufacturerid,vendor,costprice,partid,quantity,isdelete="No",modifydate=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());  
    private float sellingprice;
    public Inventory() {
    }

    public Inventory(String id, String invoiceid, String insurancepercent, String insurancecompanyamount, String insurancecustomeramount, String total, String type, String manufacturerid, String vendor, String costprice, String partid, String quantity, float sellingprice) {
        this.id = id;
        this.invoiceid = invoiceid;
        this.insurancepercent = insurancepercent;
        this.insurancecompanyamount = insurancecompanyamount;
        this.insurancecustomeramount = insurancecustomeramount;
        this.total = total;
        this.type = type;
        this.manufacturerid = manufacturerid;
        this.vendor = vendor;
        this.costprice = costprice;
        this.partid = partid;
        this.quantity = quantity;
        this.sellingprice = sellingprice;
    }

    public float getSellingprice() {
        return sellingprice;
    }

    public void setSellingprice(float sellingprice) {
        this.sellingprice = sellingprice;
    }
        
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getInvoiceid() {
        return invoiceid;
    }

    public void setInvoiceid(String invoiceid) {
        this.invoiceid = invoiceid;
    }

    public String getInsurancepercent() {
        return insurancepercent;
    }

    public void setInsurancepercent(String insurancepercent) {
        this.insurancepercent = insurancepercent;
    }

    public String getInsurancecompanyamount() {
        return insurancecompanyamount;
    }

    public void setInsurancecompanyamount(String insurancecompanyamount) {
        this.insurancecompanyamount = insurancecompanyamount;
    }

    public String getInsurancecustomeramount() {
        return insurancecustomeramount;
    }

    public void setInsurancecustomeramount(String insurancecustomeramount) {
        this.insurancecustomeramount = insurancecustomeramount;
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getManufacturerid() {
        return manufacturerid;
    }

    public void setManufacturerid(String manufacturerid) {
        this.manufacturerid = manufacturerid;
    }

    public String getVendor() {
        return vendor;
    }

    public void setVendor(String vendor) {
        this.vendor = vendor;
    }

    public String getCostprice() {
        return costprice;
    }

    public void setCostprice(String costprice) {
        this.costprice = costprice;
    }

    public String getPartid() {
        return partid;
    }

    public void setPartid(String partid) {
        this.partid = partid;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
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
