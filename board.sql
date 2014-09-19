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

update board set content = id||'- At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culp orem ipsum dolor sit amet, consectetur adipiscing elit. Ut non libero magna. Sed et quam lacus. Fusce condimentum eleifend enim a feugiat. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non libero consectetur adipiscing elit magna. Sed et quam lacus. Fusce condimentum eleifend enim a feugiat.- At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culp orem ipsum dolor sit amet, consectetur adipiscing elit. Ut non libero magna. Sed et quam lacus. Fusce condimentum eleifend enim a feugiat. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non libero consectetur adipiscing elit magna. Sed et quam lacus. Fusce condimentum eleifend enim a feugiat.- At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culp orem ipsum dolor sit amet, consectetur adipiscing elit. Ut non libero magna. Sed et quam lacus. Fusce condimentum eleifend enim a feugiat. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non libero consectetur adipiscing elit magna. Sed et quam lacus. Fusce condimentum eleifend enim a feugiat.';

create table member (
  id serial primary key,
  email varchar(200) not null,
  password varchar(999) not null,
  name varchar(100),
  nickname varchar(200),
  regdate date not null default current_date
)
;

-- (select  -1 as id, 'total' as title, 'total' as content, 'total' as author, to_date('19700101','YYYYMMDD') as cdate, 0 as likecnt,0 as hatecnt,count(id) as viewcnt, 0 as categories_id, '' as categories_name
-- from board)
-- union all
-- (select b.id, b.title, b.content, b.author, b.cdate, b.likecnt, b.hatecnt, b.viewcnt, b.categories_id, c.name  as categories_name
--  from board b, categories c
-- where 1=1
--   and b.categories_id = c.id
-- order by id desc limit 50 offset 102)
;
( select  -1 as id, 'total' as title, 'total' as content, 'total' as author, to_date('19700101','YYYYMMDD') as cdate, 0 as likecnt,0 as hatecnt,count(id) as viewcnt, 0 as categories_id, '' as categories_name
  from board)
union all
(select b.id, b.title, b.content, b.author, b.cdate, b.likecnt, b.hatecnt, b.viewcnt, b.categories_id, c.name  as categories_name
 from board b, categories c
 where 1=1
       and b.categories_id = c.id
--        and c.id = 1
 order by id desc limit 10 offset 30 )
;

select b.id, b.title, b.content, b.author, b.cdate, b.likecnt, b.hatecnt, b.viewcnt, b.categories_id, c.name  as categories_name
from board b left join categories c on b.categories_id = c.id
where 1=1
-- and (b.categories_id = c.id and c.id = 9) or (c.name = 'all')
and case when c.id = 9 and  c.name = 'all' then true end

  order by b.id
limit 100

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

select * from comments;
insert INTO COMMENTS(board_id, id, parent, CONTENT, author)
select * from (
SELECT
  x.id           AS board_id,
  (s + 202)     AS id,
  202 + s/5 AS parent,
  (s + 202) ||
  '- At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culp orem ipsum dolor sit amet, consectetur adipiscing elit. Ut non libero magna. Sed et quam lacus. Fusce condimentum eleifend enim a feugiat. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non libero consectetur adipiscing elit magna. Sed et quam lacus. Fusce condimentum eleifend enim a feugiat.',
  (s + 202) || '- dockill'
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
) y where y.board_id = 65504
;
65506 0
65505 101
65504 202

;
delete from comments where id = parent;


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

-- select fn_hierarchy_connnect_by(min(parent),1,min(board_id)) as h from comments where board_id =262142;
--
-- delete from comments where board_id = 262142 and id =parent;

select
  id, idtree, parent, content, author, cdate, likecnt, hatecnt,
--   lag(level,1) over (order by id) as prevlevel,
  level- lag(level,1) over (order by seq) as prevlevel,
  coalesce(level-lead(level,1) over (order by seq),0) as nextlevel
  from (
    SELECT
      row_number() over() as seq,
      ((q.h).node).id,
      repeat(' ', (q.h).level) || ((q.h).node).id AS idtree,
      ((q.h).node).parent,
      ((q.h).node).author,
      ((q.h).node).cdate,
      ((q.h).node).likecnt,
      ((q.h).node).hatecnt,
      ((q.h).node).content,
      (q.h).level,
      h
    FROM (
           SELECT
             fn_hierarchy_connnect_by(min(parent), 1, min(board_id)) AS h
           FROM comments
           WHERE board_id = 65504
         ) AS q
  ) a
;
-- SELECT
--   fn_hierarchy_connnect_by(min(parent), 1, min(board_id)) AS h
-- FROM comments
-- WHERE board_id = 131042;

-- SELECT
-- row_number() over() as id,
-- repeat('-', (q.h).level) || ((q.h).node).id AS tt,
-- ((q.h).node).parent,
-- ((q.h).node).content,
-- (q.h).level
-- FROM (
-- --   select fn_hierarchy_connnect_by(202,1,262142) as h
-- SELECT
-- fn_hierarchy_connnect_by(min(parent), 1, min(board_id)) AS h
-- FROM comments
-- WHERE board_id = 262142
-- ) AS q
--
--   ;

select substring(content,0,30) from comments;
update comments set content = substring(content,0,30);
;
create table boardmaster(
  id int not null primary key ,
  name varchar(200),
  tablenm varchar(200),
  typecode varchar(10)
);

insert into boardmaster(id, name, tablenm, typecode) values(1, 'general sample', 'board', 'general');
insert into boardmaster(id, name, tablenm, typecode) values(2, 'gallery sample', 'gallery', 'gallery');
insert into boardmaster(id, name, tablenm, typecode) values(3, 'contract sample', 'contract', 'contract');


create table categories (
  boardmaster_id int not null references boardmaster(id),
  id int not null primary key ,
  name varchar(200),
  isall char(1)
);
select * from categories;
insert into categories(boardmaster_id, id, name) values(1, 1, 'computer');
insert into categories(boardmaster_id, id, name) values(1, 2, 'digital');
insert into categories(boardmaster_id, id, name) values(1, 3, 'book');
insert into categories(boardmaster_id, id, name) values(1, 4, 'appliance');
insert into categories(boardmaster_id, id, name) values(1, 5, 'baby');
insert into categories(boardmaster_id, id, name) values(1, 6, 'camera');
insert into categories(boardmaster_id, id, name) values(1, 7, 'fashion');
insert into categories(boardmaster_id, id, name) values(1, 8, 'fishing');
insert into categories(boardmaster_id, id, name) values(1, 9, 'all');

update board set categories_id = 1 where id%8 = 0;
update board set categories_id = 2 where id%8 = 1;
update board set categories_id = 3 where id%8 = 2;
update board set categories_id = 4 where id%8 = 3;
update board set categories_id = 5 where id%8 = 4;
update board set categories_id = 6 where id%8 = 5;
update board set categories_id = 7 where id%8 = 6;
update board set categories_id = 8 where id%8 = 7;

-- alter table board rename column categories to categories_id;
alter table board add column categories_id int;

alter table categories add column isall char(1) not null default '0';
select boardmaster_id, id, name from categories where boardmaster_id =
    ;

select distinct board_id from comments;

update comments set board_id = 262134 where board_id= 262144;
update comments set board_id = 262133 where board_id= 262143;
update comments set board_id = 262132 where board_id= 262142;


select boardmaster_id, id, name from categories where boardmaster_id = 1;

select * from categories where name ='all';
update categories set isall=1 where name ='all';
update categories set isall=0 where name <>'all';

select * from board order by id desc;

( select  -1 as id, 'total' as title, 'total' as content, 'total' as author, to_date('19700101','YYYYMMDD') as cdate, 0 as likecnt,0 as hatecnt,count(id) as viewcnt, 0 as categories_id, '' as categories_name
  from board)
union all
(select b.id, b.title, b.content, b.author, b.cdate, b.likecnt, b.hatecnt, b.viewcnt, b.categories_id, c.name  as categories_name
 from board b, categories c
 where 1=1
       and b.categories_id = c.id
 order by id desc limit 20 offset 0 );


select * from board where categories_id is null;

update board set categories_id = 1 where categories_id is null;

delete from comments p  where p.board_id = 131042 and p.id = 99 and not exists (select 'e' from comments c where p.id = c.parent );

select * from comments p where board_id = 131042;
