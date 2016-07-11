/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.main.model;

/**
 *
 * @author user
 */
public class PurchaseOrderReceived {

    String[] partids, manufacturerids, quantitys, costprices, oldpodsid, billnumber;
    int totalitems;
    float[] sellingprices;
    String vendor, poid;

    
    public PurchaseOrderReceived() {
    }

    public String[] getPartids() {
        return partids;
    }

    public void setPartids(String[] partids) {
        this.partids = partids;
    }

    public String[] getManufacturerids() {
        return manufacturerids;
    }

    public void setManufacturerids(String[] manufacturerids) {
        this.manufacturerids = manufacturerids;
    }

    public String[] getQuantitys() {
        return quantitys;
    }

    public void setQuantitys(String[] quantitys) {
        this.quantitys = quantitys;
    }

    public String[] getCostprices() {
        return costprices;
    }

    public void setCostprices(String[] costprices) {
        this.costprices = costprices;
    }

    public String[] getOldpodsid() {
        return oldpodsid;
    }

    public void setOldpodsid(String[] oldpodsid) {
        this.oldpodsid = oldpodsid;
    }

    public String[] getBillnumber() {
        return billnumber;
    }

    public void setBillnumber(String[] billnumber) {
        this.billnumber = billnumber;
    }

    public int getTotalitems() {
        return totalitems;
    }

    public void setTotalitems(int totalitems) {
        this.totalitems = totalitems;
    }

    public PurchaseOrderReceived(String[] partids, String[] manufacturerids, String[] quantitys, String[] costprices, String[] oldpodsid, String[] billnumber, int totalitems, float[] sellingprices, String vendor, String poid) {
        this.partids = partids;
        this.manufacturerids = manufacturerids;
        this.quantitys = quantitys;
        this.costprices = costprices;
        this.oldpodsid = oldpodsid;
        this.billnumber = billnumber;
        this.totalitems = totalitems;
        this.sellingprices = sellingprices;
        this.vendor = vendor;
        this.poid = poid;
    }

    public float[] getSellingprices() {
        return sellingprices;
    }

    public void setSellingprices(float[] sellingprices) {
        this.sellingprices = sellingprices;
    }
    
    public String getVendor() {
        return vendor;
    }

    public void setVendor(String vendor) {
        this.vendor = vendor;
    }

    public String getPoid() {
        return poid;
    }

    public void setPoid(String poid) {
        this.poid = poid;
    }
    
    

}
