package com.vgstchris.icecreamtracker;

import com.vgstchris.icecreamtracker.model.Flavor;
import com.vgstchris.icecreamtracker.model.User;
import com.vgstchris.icecreamtracker.repository.FlavorRepository;
import com.vgstchris.icecreamtracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/*
Initialize some starting data and insert it into the H2 database:

1 user with username: chris, password: chris (encoded)
3 flavors: Chocolate, Vanilla, Strawberry

This initializer does not add ratings or any relational data between User
and Flavor
 */

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final FlavorRepository flavorRepository;

    private PasswordEncoder encoder = encoder();

    private List<User> users = new ArrayList<User>(
            Arrays.asList(
                    new User("chris", encoder.encode("chris"), "USER")
                    //Support for multiple users in future release
                )
    );

    private List<Flavor> flavors = new ArrayList<Flavor>(
            Arrays.asList(
                    new Flavor("Chocolate"),
                    new Flavor("Vanilla"),
                    new Flavor("Strawberry")
            )
    );

    @Override
    public void run(String... args) throws Exception {
        userRepository.saveAll(users);
        flavorRepository.saveAll(flavors);



        log.info("Users Initialized:");
        for(User user : userRepository.findAll()) {
            log.info(user.toString());
        }

        log.info("Ice Cream Flavors Initialized:");
        for(Flavor flavor : flavorRepository.findAll()) {
            log.info(flavor.toString());
        }
    }

    private PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }
}
