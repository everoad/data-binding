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

        public static info create(Integer id, save dto) {
            return info.builder()
                    .id(id)
                    .title(dto.getTitle())
                    .writer(dto.getWriter())
                    .build();
        }

    }
}
