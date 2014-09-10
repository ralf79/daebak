package com.daebak.user;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by system on 2014. 9. 8..
 */
public class UserMapper implements RowMapper<User> {

    @Override
    public User mapRow(ResultSet resultSet, int i) throws SQLException {
        User vo = new User();
//        private long id;
//        private String firstName;
//        private String lastName;
//        private String email;
//        private String phoneNumber;
//        private String nickName;
        vo.setId(resultSet.getLong("id"));
        vo.setName(resultSet.getString("name"));
        vo.setEmail(resultSet.getString("email"));
        vo.setPassword(resultSet.getString("password"));
        vo.setPhoneNumber(resultSet.getString("phonNumber"));
        vo.setNickName(resultSet.getString("nickName"));
        return vo;
    }
}
