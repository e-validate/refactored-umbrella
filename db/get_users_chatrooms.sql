select   DISTINCT(m.chatroom_id) , m.swiped_id , u.image1, cj.unread_messages from matches m
left join user_appearance u 
on m.swiped_id = u.user_id 
left join chat_junc cj 
on m.swiper_id = cj.user_id
where cj.user_id in (select swiper_id from matches
where swiped_id = $1
and swiper_id != $1 
and likes = TRUE) 
and m.swiper_id = $1
