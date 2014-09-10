package com.daebak.board;

import javax.sql.DataSource;
import java.util.List;

/**
 * Created by system on 2014. 9. 5..
 */
public interface BoardDAO {
    public void setDataSource(DataSource ds);
    public void create(Board vo);
    public Board getBoard(Integer id);
    public List<Board> listBoard(int draw, int start, int length);
    public void delete(Board vo);
    public void update(Board vo);
    public void ilike(Board vo);
    public void ihate(Board vo);
    public void iView(Board vo);


}
