/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.socialmint.socialmintserver.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author fespinosa
 */
@Controller
public class UserController {

    @Autowired
    private SessionRegistry sessionRegistry;

    @RequestMapping("/onlineUsers")
    @ResponseBody
    private List<User> getLoggedInUsers() {

        return listLoggedInUsers();
    }

    public List<User> listLoggedInUsers() {
        final List<User> users = new ArrayList<>();
        final List<Object> allPrincipals = sessionRegistry.getAllPrincipals();
        for (final Object principal : allPrincipals) {
            if (principal instanceof User) {
                users.add((User) principal);
            }
        }
        return users;
    }

}
