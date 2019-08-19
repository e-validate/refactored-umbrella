select count(read) from messages
where chatroom_id = $1
and sender_id != $2
and read = 'false'; 
