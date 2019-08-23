select * from messages m
join users u
on u.user_id = m.sender_id
join user_appearance ua
on ua.user_id = u.user_id
where m.chatroom_id = $1
and sender_id in ($2,$3)
order by messages_id asc;