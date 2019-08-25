select chatroom_id from matches m 
where swiper_id = $1
and swiped_id = $2
and exists (select chatroom_id from matches m 
where swiper_id = $2
and swiped_id = $1);