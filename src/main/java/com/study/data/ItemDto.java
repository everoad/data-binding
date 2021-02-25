package com.study.data;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class ItemDto {

    @Getter @Setter
    public static class save {
        @NotBlank
        private String title;
        @NotBlank
        private String writer;

        public Item toEntity() {
            return Item.builder()
                    .title(title)
                    .writer(writer)
                    .build();
        }
    }

    @Getter @Setter
    public static class info {

        private Integer id;
        private String title;
        private String writer;

        @Builder
        public info(Integer id, String title, String writer) {
            this.id = id;
            this.title = title;
            this.writer = writer;
        }

        public static info create(Item item) {
            return info.builder()
                    .id(item.getId())
                    .title(item.getTitle())
                    .writer(item.getWriter())
                    .build();
        }

    }
}
