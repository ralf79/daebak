package com.daebak.board;

/**
 * Created by system on 2014. 9. 6..
 */
public class BoardRestURIConstants {
    public static final String DUMMY_URL = "dummy";
    public static final String GET_URL = "view/{id}";
    public static final String LIST_URL = "list/{categories_id}/{isall}";
    public static final String INFO_URL = "info/{id}";
    public static final String EDIT_URL = "edit";
    public static final String CREATE_URL = "add";
    public static final String DELETE_URL = "delete";

    public static final String LIST_COMMENT_URL = "comment/list/{board_id}";
    public static final String CREATE_COMMENT_URL = "comment/add";
    public static final String DELETE_COMMENT_URL = "comment/delete";
    public static final String EDIT_COMMENT_URL = "comment/edit";
}
