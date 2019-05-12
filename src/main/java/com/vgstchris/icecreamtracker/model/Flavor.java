package com.vgstchris.icecreamtracker.model;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@NoArgsConstructor
@Entity
public class Flavor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String flavor;

    @OneToMany(mappedBy="flavor", cascade=CascadeType.MERGE)
    private List<Rating> ratings = new ArrayList<>();

}
