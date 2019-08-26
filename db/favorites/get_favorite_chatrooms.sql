SELECT * from user_favorite_chatrooms 
join matches  
on matches.swiped_id = user_favorite_chatrooms.swiped_id
where user_favorite_chatrooms.user_id = $1
limit 1;


-- select distinct(m.chatroom_id), m.swiper_id, m.swiped_id, cj.unread_messages, u.image1 from matches m
-- left join chat_junc cj 
-- on m.chatroom_id = cj.chatroom_id
-- join user_favorite_chatrooms uf
-- on m.chatroom_id = uf.chatroom_id
-- left join user_appearance u 
-- on m.swiped_id = u.user_id 
-- where m.chatroom_id in ( select chatroom_id from matches 
-- group by chatroom_id having count(*)>1)
-- and m.swiper_id = $1
-- and junc_id in (select junc_id from chat_junc
-- where user_id = $1 and chatroom_id in ( select chatroom_id from matches 
-- group by chatroom_id having count(*)>1)
-- );

