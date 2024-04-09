package org.suryansh.chatapp.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
import org.suryansh.chatapp.eNum.Status;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Entity
public class User{
        @Id
        private String nick_name;
        private String full_name;
        private Status status;
}
