package com.study.data;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/items", produces = MediaType.APPLICATION_JSON_VALUE)
public class ItemController {

    private final ItemService itemService;

    @GetMapping
    public List<ItemDto.info> getItemList() {
        return itemService.queryItems();
    }

    @PostMapping
    public Boolean addItem(@Valid @RequestBody ItemDto.save saveDto) {
        itemService.addItem(saveDto);
        return true;
    }

    @PutMapping("/{id}")
    public Boolean editItem(@PathVariable("id") Integer id, @Valid @RequestBody ItemDto.save saveDto) {
        itemService.editItem(id, saveDto);
        return true;
    }

    @DeleteMapping("/{id}")
    public Boolean removeItem(@PathVariable("id") Integer id) {
        itemService.removeItem(id);
        return true;
    }

}
