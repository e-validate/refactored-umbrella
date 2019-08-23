insert into messages (sender_id, chatroom_id, content, timestamp_sent, read, time)
values ($1, $2, $3, now() , 'false', (select To_CHAR((SELECT Now() AT TIME ZONE 'US/Mountain'), 'hh:MI AM') "Date 12Hr") );


select * from messages m
join users u
on u.user_id = m.sender_id
join user_appearance ua
on ua.user_id = u.user_id
where m.chatroom_id = $2
order by messages_id asc;

