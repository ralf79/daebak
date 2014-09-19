package com.daebak.board;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;


@Controller
@RequestMapping("/api/v1.0/board/")
public class BoardController {
    private static final Logger log = Logger.getLogger(BoardController.class.getName());

    @Autowired
    BoardJDBCTemplate boardJDBCTemplate;

    @RequestMapping(value = BoardRestURIConstants.DUMMY_URL, method = RequestMethod.POST)
    public @ResponseBody
    Board testBoard(ModelMap model) {
        log.info("--------- testBoard");
        return new Board(); //boardJDBCTemplate.getBoard(id);
    }

    @RequestMapping(value = BoardRestURIConstants.LIST_URL, method = RequestMethod.GET)
    public @ResponseBody
    Map<String,Object> listBoard(@PathVariable("categories_id") int categories_id,
                                 @PathVariable("isall") int isall,
                                 @RequestParam("draw") int draw,
                          @RequestParam("start") int start,
                          @RequestParam("length") int length,
                          ModelMap model) {
        log.info("--------- listBoard:" + draw + ":" + start + ":"+ length);
        List<Board> items = boardJDBCTemplate.listBoard(draw,start,length, categories_id,isall);
        log.info("-------> List<Board> length is " + items.size());
        Map<String, Object> result = new HashMap<String, Object>();

        Board totalRow = items.get(0);
        log.info(String.valueOf(totalRow.getId()));
        log.info(String.valueOf(totalRow.getTitle()));
        if(totalRow.getId() == -1){
            result.put("recordsTotal", totalRow.getViewcnt());
            result.put("recordsFiltered", totalRow.getViewcnt());
            items.remove(0);
        }
        List<List> nitems = new ArrayList<List>();
        for(int i=0;i<items.size();i++){
            List<String> nitem = new ArrayList<String>();
            nitem.add(items.get(i).getId()+"");
            nitem.add("<a href='/#/board/view/"+items.get(i).getId()+"'>"+ items.get(i).getTitle().trim() + "</a>");
            nitem.add(items.get(i).getCategories_name());
            nitem.add(items.get(i).getAuthor().trim());
            nitem.add(items.get(i).getCdate().trim());
            nitem.add(items.get(i).getViewcnt()+"");
            nitems.add(nitem);
        }
        result.put("draw", draw);
        result.put("data", nitems);
//        log.info(String.valueOf(result));
        return result;
    }

    @RequestMapping(value = BoardRestURIConstants.GET_URL, method = RequestMethod.GET)
    public @ResponseBody
    Map<String,Object> getBoard(@PathVariable("id") int id, ModelMap model) {
        log.info("------- getBoard(" + id + ")");
        Map<String, Object> result = new HashMap<String, Object>();
        Board t = boardJDBCTemplate.getBoard(id);
        List<Comments> cl = boardJDBCTemplate.listComment(id);
        result.put("board", t);
        result.put("comments", cl);
        log.info(String.valueOf(cl));
        return result;
    }

    @RequestMapping(value = BoardRestURIConstants.INFO_URL, method = RequestMethod.GET)
    public @ResponseBody
    Map<String,Object> infoBoard(@PathVariable("id") int id, ModelMap model) {
        log.info("------- infoBoard(" + id + ")");
        Map<String, Object> result = new HashMap<String, Object>();

        List<Categories> cl = boardJDBCTemplate.listCategories(id);
        result.put("categories", cl);
        log.info(String.valueOf(cl));
        return result;
    }

    @RequestMapping(value = BoardRestURIConstants.CREATE_URL, method = RequestMethod.POST)
    public @ResponseBody
    Map<String, String> createBoard(@RequestBody Board board, ModelMap model) {
        log.info("--------- createBoard");
        log.info(String.valueOf(board));
        boardJDBCTemplate.create(board);
        Map<String, String> result = new HashMap<String, String>();
        result.put("success", "200");
        return result;
    }

    @RequestMapping(value = BoardRestURIConstants.EDIT_URL, method = RequestMethod.POST)
    public @ResponseBody
    Map<String, String> editBoard(@RequestBody Board board,ModelMap model) {
        log.info("--------- editBoard");
        log.info(String.valueOf(board));
        boardJDBCTemplate.update(board);
        Map<String, String> result = new HashMap<String, String>();
        result.put("success", "200");
        return result;
    }

    @RequestMapping(value = BoardRestURIConstants.DELETE_URL, method = RequestMethod.POST)
    public @ResponseBody
    Map<String, String> deleteBoard(@RequestBody Board board, ModelMap model) {
        log.info("--------- deleteBoard");
        log.info(String.valueOf(board));
        boardJDBCTemplate.delete(board);
        Map<String, String> result = new HashMap<String, String>();
        result.put("success", "200");
        return result;
    }


    @RequestMapping(value = BoardRestURIConstants.CREATE_COMMENT_URL, method = RequestMethod.POST)
    public @ResponseBody
    Map<String, String> createComment(@RequestBody Comments vo, ModelMap model) {
        log.info("--------- createComment");
        log.info(String.valueOf(vo));
        boardJDBCTemplate.createComment(vo);
        Map<String, String> result = new HashMap<String, String>();
        result.put("success", "200");
        return result;
    }

    @RequestMapping(value = BoardRestURIConstants.DELETE_COMMENT_URL, method = RequestMethod.POST)
    public @ResponseBody
    Map<String, String> deleteComment(@RequestBody Comments vo, ModelMap model) {
        log.info("--------- deleteComment");
        log.info(String.valueOf(vo));
        boardJDBCTemplate.deleteComment(vo);
        Map<String, String> result = new HashMap<String, String>();
        result.put("success", "200");
        return result;
    }

    @RequestMapping(value = BoardRestURIConstants.EDIT_COMMENT_URL, method = RequestMethod.POST)
    public @ResponseBody
    Map<String, String> updateComment(@RequestBody Comments vo, ModelMap model) {
        log.info("--------- updateComment");
        log.info(String.valueOf(vo));
        boardJDBCTemplate.updateComment(vo);
        Map<String, String> result = new HashMap<String, String>();
        result.put("success", "200");
        return result;
    }

}
