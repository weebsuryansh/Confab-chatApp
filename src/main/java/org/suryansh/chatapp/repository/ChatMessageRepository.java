package org.suryansh.chatapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.suryansh.chatapp.entity.ChatMessage;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage,String> {
    List<ChatMessage> findByChatId(String chatId);
}
