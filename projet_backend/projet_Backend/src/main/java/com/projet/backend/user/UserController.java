package com.projet.backend.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/user")
@RequiredArgsConstructor
public class UserController implements IUserController {
    private final UserService userService;

    @PostMapping(path = "/register_client")
    @Override
    public ResponseEntity<?> registerAClient(@RequestBody User user) {
        try {
            boolean test = userService.registerAClient(user);
            if (test) {
                return new ResponseEntity<>(test, HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(test, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception exception) {
            //exception.printStackTrace();
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/login")
    @Override
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            return new ResponseEntity<>(userService.login(user), HttpStatus.OK);

        } catch (Exception exception) {
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping(path = "/register_admin")
    @Override
    public ResponseEntity<?> registerAnAdmin(@RequestBody User user) {
        try {
            boolean test = userService.registerAnAdmin(user);
            if (test) {
                return new ResponseEntity<>(test, HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(test, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception exception) {
            //exception.printStackTrace();
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/clients")
    @Override
    public ResponseEntity<List<User>> loadAllClients() {
        try {
            return new ResponseEntity<>(userService.loadAllClients(), HttpStatus.ACCEPTED);
        } catch (Exception exception) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(path = "/update_user/{id}/")
    @Override
    public ResponseEntity<?> updateAUser(@PathVariable("id") UUID id, @RequestBody User user) {
        User updatedUser = userService.updateUser(id, user);
        if (updatedUser != null) {
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable UUID id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
