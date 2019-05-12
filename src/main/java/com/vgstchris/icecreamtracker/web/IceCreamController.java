package com.vgstchris.icecreamtracker.web;

import com.vgstchris.icecreamtracker.model.Flavor;
import com.vgstchris.icecreamtracker.model.Rating;
import com.vgstchris.icecreamtracker.model.User;
import com.vgstchris.icecreamtracker.repository.FlavorRepository;
import com.vgstchris.icecreamtracker.repository.RatingRepository;
import com.vgstchris.icecreamtracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class IceCreamController {

    @Autowired
    private FlavorRepository flavorRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RatingRepository ratingRepository;

    @GetMapping("/allFlavors")
    Collection<Flavor> allFlavors(Authentication authentication) {

        return flavorRepository.findAllByOrderByFlavorAsc();
    }

    @GetMapping("/flavor/{id}")
    ResponseEntity<Flavor> getFlavorById(@PathVariable Long id, Authentication authentication) {

        Optional<Flavor> flavor = flavorRepository.findById(id);
        Flavor returnFlavor = flavor.get();

        return ResponseEntity.ok().body(returnFlavor);
    }

    @GetMapping("/user")
    User currentUserName(Authentication authentication) {

        if(authentication != null) {
            return userRepository.findByName(authentication.getName());
        }

        return new User();
    }

    @PostMapping("/flavor")
    ResponseEntity<Flavor> addFlavor(@Valid @RequestBody Flavor flavor) throws URISyntaxException {

        Flavor result = flavorRepository.save(flavor);
        return ResponseEntity.created(new URI("/api/flavor/" + result.getId())).body(result);
    }

    @PostMapping("/rating")
    ResponseEntity<Rating> addRating(@Valid @RequestBody Rating rating, Authentication authentication) throws URISyntaxException {

        if(authentication != null) {

            User user = userRepository.findByName(authentication.getName());
            Flavor flavor = rating.getFlavor();

            rating.setUser(user);
            flavor.getRatings().add(rating);

            Flavor result = flavorRepository.save(flavor);

            return ResponseEntity.ok().body(rating);
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PutMapping("/rating")
    ResponseEntity<Flavor> updateRating(@Valid @RequestBody Rating rating, Authentication authentication) throws URISyntaxException {

        User user = userRepository.findByName(authentication.getName());
        Flavor flavor = rating.getFlavor();
        Rating newRating = ratingRepository.findByUserAndFlavor(user, flavor);

        newRating.setIceCreamRating(rating.getIceCreamRating());
        flavor.getRatings().clear();
        flavor.getRatings().add(newRating);

        flavorRepository.save(flavor);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);

    }
}
