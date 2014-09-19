package com.daebak.board;

import com.daebak.IndexController;

import java.io.Serializable;

/**
 * Created by system on 2014. 9. 13..
 */
public class Comments implements Serializable {
    private Integer board_id;
    private Integer id;
    private String idtree;
    private Integer parent;
    private String content;
    private String author;
    private String cdate;
    private Integer likecnt;
    private Integer hatecnt;
    private Integer prevlevel;
    private Integer nextlevel;

    public Integer getBoard_id() {
        return board_id;
    }

    public void setBoard_id(Integer board_id) {
        this.board_id = board_id;
    }

    public String getIdtree() {
        return idtree;
    }

    public void setIdtree(String structure) {
        this.idtree = structure;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getParent() {
        return parent;
    }

    public void setParent(Integer parent) {
        this.parent = parent;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getCdate() {
        return cdate;
    }

    public void setCdate(String cdate) {
        this.cdate = cdate;
    }

    public Integer getLikecnt() {
        return likecnt;
    }

    public void setLikecnt(Integer likecnt) {
        this.likecnt = likecnt;
    }

    public Integer getHatecnt() {
        return hatecnt;
    }

    public void setHatecnt(Integer hatecnt) {
        this.hatecnt = hatecnt;
    }

    public Integer getPrevlevel() {
        return prevlevel;
    }

    public void setPrevlevel(Integer prevlevel) {
        this.prevlevel = prevlevel;
    }

    public Integer getNextlevel() {
        return nextlevel;
    }

    public void setNextlevel(Integer nextlevel) {
        this.nextlevel = nextlevel;
    }
}
