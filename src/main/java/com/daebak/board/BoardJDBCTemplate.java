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
    public List<Board> listBoard(int draw, int start, int length, int categories_id,int isall) {

        String SQL =
                "( select  -1 as id, 'total' as title, 'total' as content, 'total' as author, to_date('19700101','YYYYMMDD') as cdate, 0 as likecnt,0 as hatecnt,count(id) as viewcnt, 0 as categories_id, '' as categories_name\n" +
                " from board)\n" +
                " union all\n" +
                " (select b.id, b.title, b.content, b.author, b.cdate, b.likecnt, b.hatecnt, b.viewcnt, b.categories_id, c.name  as categories_name\n" +
                "  from board b, categories c\n" +
                " where 1=1\n" +
                "  and b.categories_id = c.id \n" +
                (isall == 0 ? "  and c.id = " + categories_id + " \n ":"") +
                " order by id desc limit "+length+" offset "+(draw*length) +" )";
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
    public List<Comments> listComment(Integer id) {
        String SQL =
               "select\n" +
               "  id, idtree, parent, content, author, cdate, likecnt, hatecnt,\n" +
               "  coalesce(level- lag(level,1) over (order by seq),0) as prevlevel,\n" +
               "  coalesce(level-lead(level,1) over (order by seq),0) as nextlevel \n" +
               "  from (\n" +
               "    SELECT\n" +
               "      row_number() over() as seq,\n" +
               "      ((q.h).node).id,\n" +
               "      repeat(' ', (q.h).level) || ((q.h).node).id AS idtree,\n" +
               "      ((q.h).node).parent,\n" +
               "      ((q.h).node).author,\n" +
               "      ((q.h).node).cdate,\n" +
               "      ((q.h).node).likecnt,\n" +
               "      ((q.h).node).hatecnt,\n" +
               "      ((q.h).node).content,\n" +
               "      (q.h).level,\n" +
               "      h\n" +
               "    FROM (\n" +
               "           SELECT\n" +
               "             fn_hierarchy_connnect_by(min(parent), 1, min(board_id)) AS h\n" +
               "           FROM comments\n" +
               "           WHERE board_id = "+id+"\n" +
               "         ) AS q\n" +
               "  ) a\n";

        log.info(SQL);
        List <Comments> items =  null;
        try{
            items = jdbcTemplateObject.query(SQL,
                    new CommentsMapper());
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
    public List<Categories> listCategories(Integer id) {
        String SQL =
                " select boardmaster_id, id, name, isall from categories where boardmaster_id = " + id;

        log.info(SQL);
        List <Categories> items =  null;
        try{
            items = jdbcTemplateObject.query(SQL,
                    new CategoriesMapper());
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
