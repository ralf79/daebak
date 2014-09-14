package com.daebak.board;

import java.io.Serializable;

/**
 * Created by system on 2014. 9. 5..
 */
public class Categories implements Serializable {

    private static final long serialVersionUID = -7788619177798333712L;

    private Integer boardmaster_id;
    private Integer id;
    private String name;
    private String isall;

    public Integer getBoardmaster_id() {
        return boardmaster_id;
    }

    public void setBoardmaster_id(Integer boardmaster_id) {
        this.boardmaster_id = boardmaster_id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIsall() {
        return isall;
    }

    public void setIsall(String isall) {
        this.isall = isall;
    }
}
