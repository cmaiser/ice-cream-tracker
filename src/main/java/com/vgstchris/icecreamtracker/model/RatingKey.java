package com.vgstchris.icecreamtracker.model;

import lombok.EqualsAndHashCode;

import java.io.Serializable;

/*
Key for composite id in Rating
 */

@EqualsAndHashCode
public class RatingKey implements Serializable {

    private User user;
    private Flavor flavor;

}
