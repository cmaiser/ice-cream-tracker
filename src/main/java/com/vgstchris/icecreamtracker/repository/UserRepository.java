package com.vgstchris.icecreamtracker.repository;

import com.vgstchris.icecreamtracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByName(String username);
}
