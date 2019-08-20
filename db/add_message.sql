insert into messages (sender_id, chatroom_id, content, timestamp_sent, read)
values ($1, $2, $3, now(), 'false');

