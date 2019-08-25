insert into messages (sender_id, chatroom_id, content, timestamp_sent, read)
values ($1, $2, $3, now(), 'false');

update chat_junc 
set unread_messages = unread_messages + 1
where chatroom_id = $2 
and user_id != $1;


select * from messages m
join users u
on u.user_id = m.sender_id
join user_appearance ua
on ua.user_id = u.user_id
where m.chatroom_id = $2;

