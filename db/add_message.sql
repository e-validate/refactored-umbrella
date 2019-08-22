insert into messages (sender_id, chatroom_id, content, timestamp_sent, read)
values ($1, $2, $3, now(), 'false');


select * from messages m
join users u
on u.user_id = m.sender_id
join user_appearance ua
on ua.user_id = u.user_id
where m.chatroom_id = $2;

