package com.study.data;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/items", produces = MediaType.APPLICATION_JSON_VALUE)
public class ItemController {

    private int count = 0;
    private final List<ItemDto.info> items = new ArrayList<>();

    @GetMapping
    public List<ItemDto.info> getItemList() {
        return items;
    }

    @PostMapping
    public Boolean addItem(@Valid @RequestBody ItemDto.save dto) {
        items.add(ItemDto.info.create(count++, dto));
        return true;
    }

    @DeleteMapping("/{id}")
    public Boolean removeItem(@PathVariable("id") Integer id) {
        for (int i = items.size() - 1; i >= 0; i--) {
            if (items.get(i).getId().equals(id)) {
                items.remove(i);
                break;
            }
        }
        return true;
    }

}
