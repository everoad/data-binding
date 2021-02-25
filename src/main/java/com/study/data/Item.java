package com.study.data;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Item {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "title", length = 20)
    private String title;

    @Column(name = "writer", length = 20)
    private String writer;

    @Builder
    public Item(String title, String writer) {
        this.title = title;
        this.writer = writer;
    }

    public void update(ItemDto.save saveDto) {
        this.title = saveDto.getTitle();
        this.writer = saveDto.getWriter();
    }

}
