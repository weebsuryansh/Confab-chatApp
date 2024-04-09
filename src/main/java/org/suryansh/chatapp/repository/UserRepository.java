package org.suryansh.chatapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.suryansh.chatapp.eNum.Status;
import org.suryansh.chatapp.entity.User;

import java.util.List;

public interface UserRepository extends JpaRepository<User,String> {
    List<User> findAllByStatus(Status status);
}
