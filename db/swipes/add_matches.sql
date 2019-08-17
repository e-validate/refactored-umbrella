insert into matches (likes, swiper_id, swiped_id)
values ($1,$2,$3);

insert into chat_junc (likes)
values ((select likes from matches 
         where matches_id = (select max(match_id) from matches)
         and likes = 'true'   
        ))

update matches set match_junc_id = (
    select max(match_junc_id) from match_junc);

update matches
set likes = true
where swiper_id = $2
and likes = false;
and swiped_id in (select swiped_id from matches
        where swiped_id = $3
        and likes = true
        and swiper_id = $2);

