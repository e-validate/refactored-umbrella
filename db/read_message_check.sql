select DISTINCT(m.swiped_id), m.swiper_id , chatrooms.chatroom_id, ua.image1, ud.name , (select count(read) from messages
where chatroom_id in (select chatroom_id from chatrooms)
and sender_id !=$2
and read = false
and chatroom_id = $1
)
 from matches m
 join chatrooms using (chatroom_id)
inner join user_appearance u
on u.user_id = m.swiped_id
inner join user_appearance ua using (user_id)
inner join users ud using (user_id)
where m.chatroom_id  in (select chatroom_id from chatrooms)
and swiped_id in (select swiper_id from matches where swiped_id = 44)
and chatroom_id = $1
and swiper_id = $2;





