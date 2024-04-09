package org.suryansh.chatapp.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.suryansh.chatapp.eNum.Status;
import org.suryansh.chatapp.entity.User;
import org.suryansh.chatapp.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    public void saveUser(User user){
        user.setStatus(Status.ONLINE);
        log.info(String.valueOf(user));
        userRepository.save(user);
    }

    public void disconnect(User user){
        User existingUser = userRepository.findById(user.getNick_name()).orElse(null);
        if(existingUser!=null){
            existingUser.setStatus(Status.OFFLINE);
            userRepository.save(existingUser);
        }
    }

    public List<User> findConnectedUsers(){
        return new ArrayList<>(userRepository.findAllByStatus(Status.ONLINE));
    }


}
