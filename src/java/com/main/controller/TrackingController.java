/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.main.controller;

import com.main.model.CustomerVehicles;
import com.main.model.Estimate;
import com.main.model.Invoice;
import com.main.model.Jobsheet;
import com.main.model.PointChecklist;
import com.main.service.AllInsertService;
import com.main.service.AllViewService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author krisenla
 */
@Controller
public class TrackingController {

    @Autowired
    AllViewService viewService;

    @Autowired
    AllInsertService insertService;

    @Autowired
    Environment env;
    
    @RequestMapping(value = "trackCarStatus")
    public ModelAndView trackCarStatus(@RequestParam(value = "id") String checklistid) {
        ModelAndView modelAndView = new ModelAndView("TrackStatus");
        //code for transaction
        Map<String, Object> getmap = new HashMap<String, Object>();
        getmap.put("servicechecklist", "Yes");
        //get 180 point details
        List<CustomerVehicles> cvlist = viewService.getanyhqldatalist("from customervehicles where id='" + checklistid + "'");
        if (cvlist.size() > 0) {
            getmap.put("checklistid", cvlist.get(0).getId());
            getmap.put("brandid", cvlist.get(0).getBrandid());
            getmap.put("pointready", cvlist.get(0).getIs180ready());

            List<PointChecklist> pointlist = viewService.getanyhqldatalist("from pointchecklist where customervehiclesid='" + cvlist.get(0).getId() + "'");
            if (pointlist.size() > 0) {
                getmap.put("pointid", pointlist.get(0).getId());
                getmap.put("estimate", pointlist.get(0).getIsestimate());
                List<Estimate> estimatelist = viewService.getanyhqldatalist("from estimate where pclid='" + pointlist.get(0).getId() + "'");
                if (estimatelist.size() > 0) {
                    getmap.put("estimateid", estimatelist.get(0).getId());
                    getmap.put("jobsheet", estimatelist.get(0).getIsjobsheetready());
                    List<Jobsheet> js = viewService.getanyhqldatalist("from jobsheet where estimateid='" + estimatelist.get(0).getId() + "'");
                    if (js.size() > 0) {
                        getmap.put("jobid", js.get(0).getId());
                        getmap.put("sparepart", js.get(0).getIsrequisitionready());
                        getmap.put("invoice", js.get(0).getIsinvoiceconverted());
                        if (js.get(0).getVerified().equals("Yes") && js.get(0).getCleaning().equals("done")
                                && js.get(0).getCar_washing().equals("done") && js.get(0).getCar_vacuuming().equals("done")
                                && js.get(0).getTyre_polish().equals("done") && js.get(0).getDashboard_polish().equals("done")
                                && js.get(0).getEngine_cleaning().equals("done") && js.get(0).getUnderchasis_cleaning().equals("done")
                                && js.get(0).getTrunk_cleaning().equals("done")) {
                            getmap.put("cleaning", "Yes");
                        } else {
                            getmap.put("cleaning", "No");
                        }
                        if (js.get(0).getIsinvoiceconverted().equals("Yes")) {
                            List<Invoice> invoicelist = viewService.getanyhqldatalist("from invoice where jobno='" + js.get(0).getId() + "'");
                            getmap.put("invoiceid", invoicelist.get(0).getId());
                        }

                    } else {
                        getmap.put("sparepart", "No");
                        getmap.put("invoice", "No");
                        getmap.put("cleaning", "No");
                    }

                } else {
                    getmap.put("jobsheet", "No");
                    getmap.put("sparepart", "No");
                    getmap.put("invoice", "No");
                    getmap.put("cleaning", "No");
                }
            } else {
                getmap.put("estimate", "No");
                getmap.put("jobsheet", "No");
                getmap.put("sparepart", "No");
                getmap.put("invoice", "No");
                getmap.put("cleaning", "No");
            }

        } else {
            getmap.put("pointready", "No");
            getmap.put("estimate", "No");
            getmap.put("jobsheet", "No");
            getmap.put("sparepart", "No");
            getmap.put("invoice", "No");
            getmap.put("cleaning", "No");
        }
        modelAndView.addObject("trackdt", getmap);

        return modelAndView;
    }
}
