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
 * @author user
 */
@Entity(name = "estimatedetails")
@Table(name = "estimatedetails")
public class EstimateDetails {
    @Id
    private String id;
    private String partlistid,partrs,labourrs,description,estimateid,totalpartrs,quantity,isdelete="No",approval="No",modifydate=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());

    public EstimateDetails() {
    }

    public EstimateDetails(String id, String partlistid, String partrs, String labourrs, String description, String estimateid, String totalpartrs, String quantity) {
        this.id = id;
        this.partlistid = partlistid;
        this.partrs = partrs;
        this.labourrs = labourrs;
        this.description = description;
        this.estimateid = estimateid;
        this.totalpartrs = totalpartrs;
        this.quantity = quantity;
    }

    

    public String getTotalpartrs() {
        return totalpartrs;
    }

    public void setTotalpartrs(String totalpartrs) {
        this.totalpartrs = totalpartrs;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }    

    public String getApproval() {
        return approval;
    }

    public void setApproval(String approval) {
        this.approval = approval;
    }
    
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }    

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPartlistid() {
        return partlistid;
    }

    public void setPartlistid(String partlistid) {
        this.partlistid = partlistid;
    }

    public String getPartrs() {
        return partrs;
    }

    public void setPartrs(String partrs) {
        this.partrs = partrs;
    }

    public String getLabourrs() {
        return labourrs;
    }

    public void setLabourrs(String labourrs) {
        this.labourrs = labourrs;
    }

    public String getEstimateid() {
        return estimateid;
    }

    public void setEstimateid(String estimateid) {
        this.estimateid = estimateid;
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
