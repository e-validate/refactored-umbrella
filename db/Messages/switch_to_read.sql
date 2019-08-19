update messages 
set read = 'true'
where sender_id != $1
and chatroom_id = $2;