
select * from users u
JOIN user_details us
on us.user_id = u.user_id
JOIN user_interests ui
on ui.user_id = u.user_id
JOIN user_appearance ua
on ua.user_id = u.user_id
JOIN user_appearance_pref uap
on uap.user_id = u.user_id
JOIN user_details_pref udp
on udp.user_id = u.user_id
where u.user_id = $1;