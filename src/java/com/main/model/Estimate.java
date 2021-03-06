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
@Entity(name = "estimate")
@Table(name = "estimate")
public class Estimate {

    @Id
    private String id;
    private String pclid,cvid,isjobsheetready="No", isdelete = "No", modifydate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());

    public Estimate(String id, String pclid, String cvid) {
        this.id = id;
        this.pclid = pclid;
        this.cvid = cvid;
    }

    public String getIsjobsheetready() {
        return isjobsheetready;
    }

    public void setIsjobsheetready(String isjobsheetready) {
        this.isjobsheetready = isjobsheetready;
    }    

    public String getCvid() {
        return cvid;
    }

    public void setCvid(String cvid) {
        this.cvid = cvid;
    }

    public Estimate() {
    }
     

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPclid() {
        return pclid;
    }

    public void setPclid(String pclid) {
        this.pclid = pclid;
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
 