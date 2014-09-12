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


create table comments (
  board_id int not null references board(id),
  id int not null primary key ,
  parent int not null,
  content text,
  author varchar(200),
  cdate date not null default CURRENT_DATE,
  likecnt real default 0,
  hatecnt real default 0
);

create index ix_comments_parent on comments (parent);

insert INTO COMMENTS(board_id, id, parent, CONTENT, author)
select * from (
SELECT
  x.id           AS board_id,
  (s + 606)     AS id,
  606 + s/5 AS parent,
  (s + 606) ||
  '- At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culp orem ipsum dolor sit amet, consectetur adipiscing elit. Ut non libero magna. Sed et quam lacus. Fusce condimentum eleifend enim a feugiat. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non libero consectetur adipiscing elit magna. Sed et quam lacus. Fusce condimentum eleifend enim a feugiat.',
  (s + 606) || '- dockill'
FROM generate_series(0,100) s, (SELECT
                                   id,
                                   title,
                                   content,
                                   author,
                                   cdate,
                                   likecnt,
                                   hatecnt,
                                   viewcnt
                                 FROM board
                                 WHERE 1 = 1
                                 ORDER BY id DESC
                                 LIMIT 50) x
) y where y.board_id = 131066
;

131072 0
131071 100
131070 202
131069 303
131068 404
131067 505
131066 606


(select id, title, content, author, cdate, likecnt, hatecnt, viewcnt from board
where 1=1
 order by id desc limit 50);

select max(id) from board;

analyze comments;

create type p_comments as (node comments, level int);

create or replace function fn_hierarchy_connnect_by(int, int, int)
returns setof p_comments
as
$$
    select case
      when node =1 then
        (comments, $2)::p_comments
      else
        fn_hierarchy_connnect_by((q.comments).id, $2+1, $3)
      end
    from (
      select comments, node
      from (
        select 1 as node union all select 2
      ) nodes, comments
      where parent = $1
        and board_id = $3
      order by id, node

    ) q;
$$
LANGUAGE 'sql';

select repeat(' ', (q.h).level) || ((q.h).node).id,
  ((q.h).node).parent, ((q.h).node).content, (q.h).level
from (
  select fn_hierarchy_connnect_by(202,1,131070) as h
) as q
  ;

select fn_hierarchy_connnect_by(min(parent),1,min(board_id)) as h from comments where board_id =131070;

select * from comments where board_id = 131070;