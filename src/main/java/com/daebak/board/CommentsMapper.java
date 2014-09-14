package com.daebak.board;


import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by system on 2014. 9. 5..
 */
public class CommentsMapper implements RowMapper<Comments> {


    @Override
    public Comments mapRow(ResultSet rs, int i) throws SQLException {
        Comments vo = new Comments();
//        vo.setId(resultSet.getInt("id"));
//        vo.setTitle(resultSet.getString("title"));
//        vo.setAuthor(resultSet.getString("author"));
//        vo.setCdate(resultSet.getString("cdate"));
//        vo.setContent(resultSet.getString("content"));
//        vo.setLikecnt(resultSet.getInt("likecnt"));
//        vo.setHatecnt(resultSet.getInt("hatecnt"));
//        vo.setViewcnt(resultSet.getInt("viewcnt"));
        vo.setId(rs.getInt("id"));
        vo.setIdtree(rs.getString("idtree"));
        vo.setContent(rs.getString("content"));
        vo.setAuthor(rs.getString("author"));
        vo.setCdate(rs.getString("cdate"));
        vo.setLikecnt(rs.getInt("likecnt"));
        vo.setHatecnt(rs.getInt("hatecnt"));
        vo.setParent(rs.getInt("parent"));
        vo.setNextlevel(rs.getInt("nextlevel"));
        vo.setPrevlevel(rs.getInt("prevlevel"));
        return vo;

    }
}
