package org.suryansh.chatapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.suryansh.chatapp.entity.ChatRoom;

import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, String> {

    Optional<ChatRoom> findBySenderIdAndRecipientId(String senderId, String recipientId);
}
