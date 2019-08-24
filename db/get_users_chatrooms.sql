select  DISTINCT(m.chatroom_id) , m.swiped_id, ua.image1 from matches m
inner join user_appearance u
on u.user_id = m.swiped_id
inner join user_appearance ua using (user_id)
inner join users ud using (user_id)
inner join chat_junc cj using (user_id)
where m.swiped_id in (select swiper_id from matches
where swiped_id = $1
and likes = TRUE)
and m.swiper_id = $1
and m.likes = true
