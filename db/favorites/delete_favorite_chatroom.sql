DELETE FROM user_favorite_chatrooms
WHERE chatroom_id = $2
AND user_id = $1;