update matches
set likes = false
where swiped_id in (select swiped_id from matches
where swiped_id = 1
and likes = false
and swiper_id = 3
)
and swiper_id = 3
and likes = true ;

-------------

update matches
set likes = true
where swiped_id in (select swiped_id from matches
where swiped_id = 1
and likes = true
and swiper_id = 3
)

and swiper_id = 3
and likes = false;
