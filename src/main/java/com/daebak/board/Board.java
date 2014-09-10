package com.daebak.board;

import java.io.Serializable;

/**
 * Created by system on 2014. 9. 5..
 */
public class Board implements Serializable {

    private static final long serialVersionUID = -7788619177798333712L;

    private Integer id;
    private String title;
    private String content;
    private String author;
    private String cdate;
    private Integer likecnt;
    private Integer hatecnt;
    private Integer viewcnt;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public Integer getViewcnt() {
        return viewcnt;
    }

    public void setViewcnt(Integer viewcnt) {
        this.viewcnt = viewcnt;
    }
}
