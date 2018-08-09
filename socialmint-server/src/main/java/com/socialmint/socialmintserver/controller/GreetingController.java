package com.socialmint.socialmintserver.controller;

import com.socialmint.socialmintserver.model.Message;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

/**
 *
 * @author fespinosa
 */
@Controller
public class GreetingController {

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @MessageMapping("/message")
    @SendTo("/queue/reply")
    public void greeting(Message message) throws Exception {
        
        messagingTemplate.convertAndSendToUser(message.getTo(), "/queue/reply", message);

    }

}
