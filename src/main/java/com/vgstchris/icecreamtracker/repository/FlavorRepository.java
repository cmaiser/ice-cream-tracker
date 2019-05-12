package com.vgstchris.icecreamtracker.repository;

import com.vgstchris.icecreamtracker.model.Flavor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlavorRepository extends JpaRepository<Flavor, Long> {

    List<Flavor> findAllByOrderByFlavorAsc();

}
