package com.daebak.common;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.*;
import java.util.logging.Logger;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by airplug on 2014. 9. 16..
 */
@Controller
@RequestMapping("/api/v1.0/common/")
public class FileUploadController {
    private static final Logger log = Logger.getLogger(FileUploadController.class.getName());

    /**
     * Upload single file using Spring Controller
     */
    @RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, List> uploadFileHandler( @RequestParam("file") MultipartFile file) {
        Map<String, List> ret = new HashMap<String, List>();
        List<String> urls = new ArrayList<String>();
        if (!file.isEmpty()) {
            try {
                byte[] bytes = file.getBytes();

                // Creating the directory to store file
                String rootPath = System.getProperty("catalina.home");
                File dir = new File(rootPath + File.separator + "webapps"+ File.separator + "ROOT" + File.separator + "tmpFiles" + File.separator);
                if (!dir.exists())
                    dir.mkdirs();

                // Create the file on server
                String name = UUID.randomUUID().toString();
                File serverFile = new File(dir.getAbsolutePath()
                        + File.separator + name);
                BufferedOutputStream stream = new BufferedOutputStream(
                        new FileOutputStream(serverFile));
                stream.write(bytes);
                stream.close();

                urls.add("http://localhost:8080/tmpFiles/" + name);
                ret.put("url", urls);

                log.info("Server File Location="
                        + serverFile.getAbsolutePath());

                return ret;
            } catch (Exception e) {

                return ret;
            }
        } else {
            return ret;
        }
    }

    /**
     * Upload multiple file using Spring Controller
     */
    @RequestMapping(value = "/uploadMultipleFile", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, List> uploadMultipleFileHandler(@RequestParam("file") MultipartFile[] files) {
        Map<String, List> ret = new HashMap<String, List>();
        List<String> urls = new ArrayList<String>();

        String message = "";
        for (int i = 0; i < files.length; i++) {
            MultipartFile file = files[i];
//            String name = names[i];
            String name = UUID.randomUUID().toString();
            try {
                byte[] bytes = file.getBytes();

                // Creating the directory to store file
                String rootPath = System.getProperty("catalina.home");
                File dir = new File(rootPath + File.separator + "webapps"+ File.separator + "ROOT" + File.separator + "tmpFiles" + File.separator);
                if (!dir.exists())
                    dir.mkdirs();

                // Create the file on server
                File serverFile = new File(dir.getAbsolutePath()
                        + File.separator + name);
                BufferedOutputStream stream = new BufferedOutputStream(
                        new FileOutputStream(serverFile));
                stream.write(bytes);
                stream.close();

                urls.add("http://localhost:8080/tmpFiles/" + name);
                ret.put("url", urls);

                log.info("Server File Location="
                        + serverFile.getAbsolutePath());

            } catch (Exception e) {
                return ret;
            }
        }
        return ret;
    }
}
