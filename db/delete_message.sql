delete from messages
where message_id = $1
returning *