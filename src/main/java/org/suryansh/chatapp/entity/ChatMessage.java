package org.suryansh.chatapp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class ChatMessage{
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int id;
        private String chatId;
        private String senderId;
        private String recipientId;
        private String content;
        private Date timeStamp;
}
