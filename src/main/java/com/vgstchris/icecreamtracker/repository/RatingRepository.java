package com.vgstchris.icecreamtracker.repository;

import com.vgstchris.icecreamtracker.model.Flavor;
import com.vgstchris.icecreamtracker.model.Rating;
import com.vgstchris.icecreamtracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RatingRepository extends JpaRepository<Rating, Long>{

    Rating findByUserAndFlavor(User user, Flavor flavor);

}
