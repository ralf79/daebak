package com.daebak.board;


import com.daebak.DBUtil;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by system on 2014. 9. 5..
 */
public class BoardMapper implements RowMapper<Board> {


    @Override
    public Board mapRow(ResultSet resultSet, int i) throws SQLException {
        Board vo = new Board();
        vo.setId(resultSet.getInt("id"));
        vo.setTitle(resultSet.getString("title"));
        vo.setAuthor(resultSet.getString("author"));
        vo.setCdate(resultSet.getString("cdate"));
        vo.setContent(resultSet.getString("content"));
        vo.setLikecnt(resultSet.getInt("likecnt"));
        vo.setHatecnt(resultSet.getInt("hatecnt"));
        vo.setViewcnt(resultSet.getInt("viewcnt"));
        if(DBUtil.doesColumnExist("categories_id", resultSet))
            vo.setCategories_id(resultSet.getInt("categories_id"));
        else
            vo.setCategories_id(0);
        if(DBUtil.doesColumnExist("categories_name", resultSet))
            vo.setCategories_name(resultSet.getString("categories_name"));
        else
            vo.setCategories_name("");
        return vo;

    }

}
