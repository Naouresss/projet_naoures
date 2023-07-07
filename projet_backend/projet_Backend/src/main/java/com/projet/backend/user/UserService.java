package com.projet.backend.user;

import com.projet.backend.config.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService implements UserCrud {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Override
    public boolean registerAClient(User user) throws Exception {
        if (user == null) {
            throw new Exception("User is null !");
        }
        user.setRole("ROLE_CLIENT");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        //user.setUnlocked(true);
        return userRepository.save(user) != null;
    }

    @Override
    public String login(User user) throws Exception {
        if (user == null) {
            throw new Exception("User is null !");
        }
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
        );
        var foundUser = userRepository.findByEmail(user.getEmail()).orElseThrow();
        return jwtService.generateToken(foundUser);
    }

    @Override
    public boolean registerAnAdmin(User user) throws Exception {
        if (user == null) {
            throw new Exception("User is null !");
        }
        user.setRole("ROLE_ADMIN");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        //user.setUnlocked(true);
        return userRepository.save(user) != null;
    }

    @Override
    public List<User> loadAllClients() {
        return userRepository.getAllUser();
    }

    @Override
    public User updateUser(UUID id, User user) {
        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser != null) {
            if (user.getNom() != null) {
                existingUser.setNom(user.getNom());
            }
            if (user.getPrenom() != null) {
                existingUser.setPrenom(user.getPrenom());
            }
            // Add other fields to update if needed

            return userRepository.save(existingUser);
        }
        return null; // or throw an exception if necessary
    }
    @Override
    public boolean deleteUser(UUID id) {
        userRepository.deleteById(id);
        return true;
    }
    }


