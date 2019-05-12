package com.vgstchris.icecreamtracker.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.ManyToOne;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@IdClass(RatingKey.class)
public class Rating{

    @Id
    @ManyToOne
    @JsonIgnoreProperties("ratings")
    private User user;

    @Id
    @ManyToOne
    @JsonIgnoreProperties("ratings")
    private Flavor flavor;

    private Integer iceCreamRating;

}
