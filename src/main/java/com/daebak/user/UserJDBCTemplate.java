package com.daebak.user;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;

import javax.sql.DataSource;
import java.util.List;
import java.util.logging.Logger;

/**
 * Created by system on 2014. 9. 8..
 */
public class UserJDBCTemplate implements UserDAO{
    private DataSource dataSource;
    private JdbcTemplate jdbcTemplateObject;
    private static final Logger log = Logger.getLogger(UserJDBCTemplate.class.getName());

    @Override
    public void setDataSource(DataSource ds) {
        this.dataSource = ds;
        this.jdbcTemplateObject = new JdbcTemplate(this.dataSource);
    }
//    private long id;
//    private String firstName;
//    private String lastName;
//    private String email;
//    private String phoneNumber;
//    private String nickName;
    @Override
    public void create(User vo) {
        String SQL = "insert into member(name, password, email, phoneNumber, nickName) values(?,?,?,?,?)";
        jdbcTemplateObject.update( SQL, vo.getName(), vo.getPassword(), vo.getEmail(), vo.getPhoneNumber(), vo.getNickName() );
        log.info("Created Record = " + vo);
    }

    @Override
    public User getUser(Integer id) {
        String SQL = "select * from member where id = ? ";
        User item = null;
        try{
            item = jdbcTemplateObject.queryForObject(SQL,
                    new Object[]{id}, new UserMapper());
        }catch(EmptyResultDataAccessException e){
            return null;
        }
        return item;
    }

    @Override
    public List<User> listUser() {
        String SQL = "select * from member";
        List <User> items =  null;
        try{
            jdbcTemplateObject.query(SQL,
                    new UserMapper());
        }catch(EmptyResultDataAccessException e){
            return null;
        }
        return items;
    }

    @Override
    public void delete(User vo) {
        String SQL = "delete from member where id = ?";
        jdbcTemplateObject.update( SQL,vo.getId() );
        log.info("Delete Record = " + vo);
    }

    @Override
    public void update(User vo) {
        String SQL = "update member set nickName=?, password=?, name=? where id = ? ";
        jdbcTemplateObject.update( SQL,vo.getNickName(), vo.getPassword(), vo.getName(), vo.getId() );
        log.info("Update Record = " + vo);
    }

    @Override
    public boolean isRight(User vo) {
        String SQL = "select * from member where email = ? and password = ? ";
        User item = null;
        try{
            item = jdbcTemplateObject.queryForObject(SQL,
                    new Object[]{vo.getEmail(), vo.getPassword()}, new UserMapper());
            if(item == null){
                return true;
            }else{
                return false;
            }
        }catch(EmptyResultDataAccessException e){
            return false;
        }

    }

    @Override
    public void resetPwd(User vo) {
        String SQL = "update member set password=? where id = ? ";
        jdbcTemplateObject.update( SQL, vo.getPassword(), vo.getId() );
        log.info("Update Record = " + vo);
    }
}
