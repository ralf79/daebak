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
    Map<String,Object> listBoard(@RequestParam("draw") int draw,
                          @RequestParam("start") int start,
                          @RequestParam("length") int length,
                          ModelMap model) {
        log.info("--------- listBoard:" + draw + ":" + start + ":"+ length);
        List<Board> items = boardJDBCTemplate.listBoard(draw,start,length);
        log.info("-------> List<Board> length is " + items.size());
        Map<String, Object> result = new HashMap<String, Object>();
//        "draw": 1,
//                "recordsTotal": 57,
//                "recordsFiltered": 57,
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
    Board getBoard(@PathVariable("id") int id, ModelMap model) {
        log.info("------- getBoard(" + id + ")");
//        return null;
        Board t = boardJDBCTemplate.getBoard(id);
        log.info(String.valueOf(t));
        return t;
    }

    @RequestMapping(value = BoardRestURIConstants.CREATE_URL, method = RequestMethod.POST)
    public @ResponseBody
    String createBoard(@RequestBody Board board, ModelMap model) {
        log.info("--------- createBoard");
        log.info(String.valueOf(board));
        boardJDBCTemplate.create(board);
        return "created";
    }

    @RequestMapping(value = BoardRestURIConstants.EDIT_URL, method = RequestMethod.POST)
    public @ResponseBody
    String editBoard(@RequestBody Board board,ModelMap model) {
        log.info("--------- createBoard");
        log.info(String.valueOf(board));
        boardJDBCTemplate.update(board);
        return "edited";
    }

    @RequestMapping(value = BoardRestURIConstants.DELETE_URL, method = RequestMethod.POST)
    public @ResponseBody
    String removeBoard(@RequestBody Board board) {
        boardJDBCTemplate.delete(board);
        return "removed";
    }


}
