package org.suryansh.chatapp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class ChatNotification {
    @Id
    private String chatId;
    private String senderId;
    private String recipientId;
    private String content;
}
