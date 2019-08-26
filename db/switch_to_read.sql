update chat_junc 
set unread_messages = 0
where chatroom_id = $1
and user_id = $2;