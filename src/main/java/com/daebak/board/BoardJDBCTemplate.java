package com.daebak.board;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;
import java.util.List;
import java.util.logging.Logger;

/**
 * Created by system on 2014. 9. 5..
 */
public class BoardJDBCTemplate implements BoardDAO {
    private DataSource dataSource;
    private JdbcTemplate jdbcTemplateObject;
    private static final Logger log = Logger.getLogger(BoardJDBCTemplate.class.getName());

    @Override
    public void setDataSource(DataSource ds) {
        this.dataSource = ds;
        this.jdbcTemplateObject = new JdbcTemplate(this.dataSource);
    }


    @Override
    public void create(Board vo) {
        String SQL = "insert into board(title,content,author) values(?,?,?)";
        jdbcTemplateObject.update(SQL, vo.getTitle(), vo.getContent(), vo.getAuthor() );
        log.info("Created Record = " + vo);
    }

    @Override
      public Board getBoard(Integer id) {
        String SQL = "select * from board where id = ? ";
        Board item = null;
        try{
            item = jdbcTemplateObject.queryForObject(SQL,
                    new Object[]{id}, new BoardMapper());
        }catch(EmptyResultDataAccessException e){
            return null;
        }
        return item;
    }

    @Override
    public List<Board> listBoard(int draw, int start, int length) {
        String SQL =
                "(select  -1 as id, 'total' as title, 'total' as content, 'total' as author, to_date('19700101','YYYYMMDD') as cdate, 0 as likecnt,0 as hatecnt,count(id) as viewcnt \n" +
                "from board)\n" +
                "union all\n" +
                "(select id, title, content, author, cdate, likecnt, hatecnt, viewcnt from board\n" +
                "where 1=1\n" +
                "order by id desc limit "+length+" offset "+(draw*length) +" )";
        log.info(SQL);
        List <Board> items =  null;
        try{
            items = jdbcTemplateObject.query(SQL,
                    new BoardMapper());
        }catch(EmptyResultDataAccessException e){
            e.printStackTrace();
            return null;
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
        return items;
    }

    @Override
    public void delete(Board vo) {
        String SQL = "delete from board where id = ?";
        try{
            jdbcTemplateObject.update(SQL, vo.getId());
            log.info("Deleted Record with ID = " + vo.getId());

        }catch(Exception e){
            log.info("BoardJDBCTemplate delete");
            log.info(e.getMessage());
        }
        return;
    }

    @Override
    public void update(Board vo) {
        String SQL = "update board set title=?, content=?,likecnt=?,hatecnt=?, viewcnt=? where id = ?";
        try{
            jdbcTemplateObject.update(SQL, vo.getTitle(), vo.getContent(), vo.getLikecnt(), vo.getHatecnt(), vo.getViewcnt(), vo.getId());
            log.info("Updated Record with ID = " + vo.getId());
        }catch(Exception e){
            log.info("BoardJDBCTemplate update");
            log.info(e.getMessage());
        }
        return;
    }

    @Override
    public void ilike(Board vo) {
        String SQL = "update board set likecnt=? where id = ?";
        jdbcTemplateObject.update(SQL, vo.getLikecnt(), vo.getId());
        log.info("Updated Record with ID = " + vo.getId());
        return;
    }

    @Override
    public void ihate(Board vo) {
        String SQL = "update board set hatecnt=? where id = ?";
        jdbcTemplateObject.update(SQL, vo.getHatecnt(), vo.getId());
        log.info("Updated Record with ID = " + vo.getId());
        return;

    }

    @Override
    public void iView(Board vo) {
        String SQL = "update board set viewcnt=? where id = ?";
        jdbcTemplateObject.update(SQL, vo.getViewcnt(), vo.getId());
        log.info("Updated Record with ID = " + vo.getId());
        return;
    }
}
