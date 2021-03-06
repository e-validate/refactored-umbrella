insert into matches (likes, swiper_id, swiped_id, date_swiped)
values ($1,$2,$3, now());

insert into match_junc (likes)
values ((select likes from matches 
            where match_id = (select max(match_id) from matches)  
             ));

update matches set match_junc_id = (
    select max(match_junc_id) from match_junc)
        where match_id = (select max(match_id) from matches);

-- update matches
--     set likes = true
--         where swiper_id = $2
--         and likes = false
--         and swiped_id in (select swiped_id from matches where swiped_id = $3 and likes = true and swiper_id = $2);

do 
    $do$
        begin 
            if exists (select match_junc_id from matches 
            where swiped_id in ($2, $3)
            and swiper_id in ($2, $3)
            and  likes = true)
        then 
            update matches 
                set match_junc_id = ( select match_junc_id from matches where swiped_id = $3 and  likes = true and swiper_id = $2)
                    where (swiper_id = $2 and swiped_id = $3)
                        or (swiper_id = $3 and swiped_id =$2);
                        insert into chatrooms (date_created) values (now());
                        insert into chat_junc (chatroom_id, user_id, unread_messages)
                        values ((select max(chatroom_id) from chatrooms), $2, 0);   
                        insert into chat_junc (chatroom_id, user_id, unread_messages)
                        values ((select max(chatroom_id) from chatrooms), $3, 0);   
update matches
set 
chatroom_id = (select max(chatroom_id) from chat_junc)
where (swiper_id =$2
and swiped_id = $3)
or (swiper_id = $3
and swiped_id = $2)
;
        else 
            update matches set match_junc_id = ( select max(match_junc_id) from match_junc)
                where match_id = (select max(match_id) from matches);
        end if;
    end
$do$;











