package com.daebak.user;

import javax.sql.DataSource;
import java.util.List;

/**
 * Created by system on 2014. 9. 8..
 */
public interface UserDAO {

    public void setDataSource(DataSource ds);
    public void create(User vo);
    public User getUser(Integer id);
    public List<User> listUser();
    public void delete(User vo);
    public void update(User vo);
    public boolean isRight(User vo);
    public void resetPwd(User vo);

}
