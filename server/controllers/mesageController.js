// to save a messages we need sender_id through session 
// and chatroom_id, content db.add_message([sender_id,chatroom_id, content]) 



// to get messages from a chatroom all we need is the chatroom_id
// this is for a matched couples messages
// db.get_chatroom_messages(chatroom_id)



// you can get the count of unread messages from this function 
// if you send in sender_id and read boolean 
// db.read_message_check([sender_id, read])



// to get chatrooms for a user to see his matches all 
// we need is the user_id from session 
// db.get_users_chatrooms(user_id)



// mark a message read when clicking the chatroom in their matches 
// component db.switch_to_read([sender_id, chatroom_id])
// sender_id so we can check if the messages are for him/her 
// or not 




