package com.study.data;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;

    public List<ItemDto.info> queryItems() {
        List<Item> items = itemRepository.findAll();
        return items.stream().map(ItemDto.info::create).collect(Collectors.toList());
    }

    @Transactional
    public void addItem(ItemDto.save saveDto) {
        Item item = saveDto.toEntity();
        itemRepository.save(item);
    }

    @Transactional
    public void editItem(Integer id, ItemDto.save saveDto) {
        Item item = queryItem(id);
        item.update(saveDto);
    }

    @Transactional
    public void removeItem(Integer id) {
        Item item = queryItem(id);
        itemRepository.delete(item);
    }

    private Item queryItem(Integer id) {
        Optional<Item> optionalItem = itemRepository.findById(id);
        if (optionalItem.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return optionalItem.get();
    }

}
