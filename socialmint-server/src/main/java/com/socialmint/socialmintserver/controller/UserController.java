/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.socialmint.socialmintserver.controller;

import com.socialmint.socialmintserver.exceptions.ResourceNotFoundException;
import com.socialmint.socialmintserver.model.User;
import com.socialmint.socialmintserver.payload.UserIdentityAvailability;
import com.socialmint.socialmintserver.payload.UserProfile;
import com.socialmint.socialmintserver.payload.UserSummary;
import com.socialmint.socialmintserver.repository.UserRepository;
import com.socialmint.socialmintserver.security.CurrentUser;
import com.socialmint.socialmintserver.security.UserPrincipal;
import java.util.ArrayList;
import java.util.List;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author fespinosa
 */
@RestController
@RequestMapping("/api")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserRepository userRepository;

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
    
    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getName());
        return userSummary;
    }

    @GetMapping("/user/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
        Boolean isAvailable = !userRepository.existsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/users/{username}")
    public UserProfile getUserProfile(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));


        UserProfile userProfile = new UserProfile(user.getId(), user.getUsername(), user.getName(), user.getCreatedAt());

        return userProfile;
    }

}
