/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.main.controller;

import com.main.model.Feedback;
import com.main.service.AllInsertService;
import com.main.service.AllUpdateService;
import com.main.service.AllViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author krisenla
 */
@Controller
public class FeedbackController {

    @Autowired
    AllViewService viewService;

    @Autowired
    AllInsertService insertService;

    @Autowired
    AllUpdateService updateService;

    @Autowired
    Environment env;
    
    
    // feature: feedback grid view
    @RequestMapping(value = "fbgridLink")
    public ModelAndView fbgridLink(@RequestParam(value = "customerid") String customerid) {
        ModelAndView modelAndView = new ModelAndView("ViewFeedbackGrid");
        modelAndView.addObject("fbListDetails", viewService.getanyjdbcdatalist("SELECT fb.id as fbid,fb.status as fbstatus,inv.*,cu.name as customername,bd.vehiclename as model,br.name as brand FROM feedback fb\n"
                + "inner join invoice inv on inv.id=fb.invoiceid\n"
                + "inner join customer cu on cu.mobilenumber=inv.customermobilenumber \n"
                + "inner join branddetails bd on bd.id=inv.vehicleid\n"
                + "inner join brand br on br.id=bd.brandid\n"
                + "where cu.id='"+customerid+"' and inv.isdelete='No' and fb.isdelete='No' and cu.isdelete='No' and bd.isdelete='No' and br.isdelete='No' \n"
                + "order by fb.savedate desc"));
        return modelAndView;
    }

    //user feedback questionairpage
    @RequestMapping(value = "userFeedbackLink")
    public ModelAndView userFeedbackLink(@RequestParam(value = "fbid") String fbid) {
        ModelAndView modelAndView = new ModelAndView("AddFeedback");
        modelAndView.addObject("invoicedtls", viewService.getanyjdbcdatalist("SELECT fb.id as fbid,fb.status as fbstatus,inv.*,cu.id as customerid,cu.name as customername,bd.vehiclename as model,br.name as brand FROM feedback fb\n"
                + "inner join invoice inv on inv.id=fb.invoiceid\n"
                + "inner join customer cu on cu.mobilenumber=inv.customermobilenumber\n"
                + "inner join branddetails bd on bd.id=inv.vehicleid\n"
                + "inner join brand br on br.id=bd.brandid\n"
                + "where fb.id='" + fbid + "'").get(0));

        modelAndView.addObject("followuphistorydetails", viewService.getanyhqldatalist("FROM followups where type='feedback' and feedbackid='" + fbid + "'"));
        return modelAndView;
    }
    
    //add feedback
    @RequestMapping(value = "insertFeedback")
    public String insertFeedback(@ModelAttribute Feedback feedback,@RequestParam(value = "customerid") String customerid) {
        feedback.setStatus("complete");
        updateService.update(feedback);
        return "redirect:fbgridLink?customerid="+customerid;
    }
    
}
