select u.name from users u
inner join chat_junc cj
on cj.user_id = u.user_id
where cj.user_id != $1
and cj.chatroom_id = $2
 