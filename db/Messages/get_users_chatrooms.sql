select * from chat_junc
natural join users
where user_id = $1;