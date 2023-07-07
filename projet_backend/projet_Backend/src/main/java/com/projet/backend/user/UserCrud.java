package com.projet.backend.user;

import java.util.List;
import java.util.UUID;

public interface UserCrud {
    boolean registerAClient(User user) throws Exception;

    String login(User user) throws Exception;

    boolean registerAnAdmin(User user) throws Exception;

    List<User> loadAllClients() throws Exception;

   // boolean updateAUser(UUID id, User user) throws Exception;

    User updateUser(UUID id, User user);
    boolean deleteUser(UUID id);
}
