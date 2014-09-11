create database testdb;
CREATE USER daebak WITH PASSWORD '!dlwlgns00';
GRANT ALL PRIVILEGES ON DATABASE testdb to daebak;

DROP table board;
CREATE TABLE board (
    id  SERIAL PRIMARY KEY,
    title       varchar(1000) NOT NULL,
    content     text not null,
    author      varchar(200),
    cdate       date not null default CURRENT_DATE,
    likecnt     REAL default 0,
    hatecnt     REAL default 0,
    viewcnt     REAL default 0
);


insert into board(title, content, author) values('This is Sample Title','At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culp orem ipsum dolor sit amet, consectetur adipiscing elit. Ut non libero magna. Sed et quam lacus. Fusce condimentum eleifend enim a feugiat. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non libero consectetur adipiscing elit magna. Sed et quam lacus. Fusce condimentum eleifend enim a feugiat. Pellentesque viverra vehicula sem ut volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non libero magna. Sed et quam lacus.','daebak');

--
-- private Long id;
-- private String title;
-- private String content;
-- private String author;
-- private String cdate;
-- private Integer likecnt;
-- private Integer hatecnt;
-- private Integer viewcnt;

insert into board(title, content, author)
select title, content, author from board;

update board set title = title || '-' ||id, content = content || '=' || id;

create table member (
  id serial primary key,
  email varchar(200) not null,
  password varchar(999) not null,
  name varchar(100),
  nickname varchar(200),
  regdate date not null default current_date
)
;

(select  -1 as id, 'total' as title, 'total' as content, 'total' as author, to_date('19700101','YYYYMMDD') as cdate, 0 as likecnt,0 as hatecnt,count(id) as viewcnt
from board)
union all
(select id, title, content, author, cdate, likecnt, hatecnt, viewcnt from board
where 1=1
order by id desc limit 50 offset 102)
;


