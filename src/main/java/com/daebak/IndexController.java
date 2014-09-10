package com.daebak;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/")
public class IndexController {

	@RequestMapping(value="/", method = RequestMethod.GET)
	public String index(ModelMap model) {
		model.addAttribute("message", "Hello world!");
		return "index";
	}
}