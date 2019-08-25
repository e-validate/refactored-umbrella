insert into messagses (sender_id, chatroom_id, content, timestamp_sent, read)
values ($1, $2, $3, (select To_CHAR((SELECT Now() AT TIME ZONE 'US/Mountain'), 'hh:MI AM') "Date 12Hr") , 'false');

