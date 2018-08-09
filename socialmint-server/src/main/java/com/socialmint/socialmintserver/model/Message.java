/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.socialmint.socialmintserver.model;

import java.util.UUID;

/**
 *
 * @author fespinosa
 */
public class Message {
    
    private String id;
    private String username;
    private String to;
    private String content;
    private String date;

    public Message(String username, String to, String content) {
        this.id = UUID.randomUUID().toString();
        this.username = username;
        this.to = to;
        this.content = content;
    }
    
    
    public Message() {
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }
    
    
    
    
    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
   
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
    
    

}
