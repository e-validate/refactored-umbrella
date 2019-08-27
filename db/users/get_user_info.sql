select *
from users
    join user_interests as ui on ui.user_id = users.user_id
    join user_appearance as ua on ua.user_id = users.user_id
    join user_details as ud on ud.user_id = users.user_id
where users.user_id = $1;