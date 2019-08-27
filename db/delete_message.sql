delete from messages 
where messages_id = $1;

select * from messages 
where chatroom_id = $2;