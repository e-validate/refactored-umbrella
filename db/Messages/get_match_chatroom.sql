select DISTINCT(chatroom_id) from chat_junc
where (user_id= $1
or user_id= $2)
and chatroom_id in (select chatroom_id from chatrooms where user_id = $1)
and
exists(select * from chat_junc
            where user_id= $1
            or user_id= $2);
