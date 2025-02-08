package com.ssafy.wevi.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "sigungu")
@IdClass(SigunguId.class)
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Sigungu {
    @Id
    private Integer sigunguId;

    @Id
    private Integer doId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "do_id", nullable = false)
    private Do doEntity;

    @Column(nullable = false)
    private String sigunguName;
}
