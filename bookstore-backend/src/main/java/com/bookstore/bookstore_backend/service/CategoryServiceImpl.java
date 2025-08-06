package com.bookstore.bookstore_backend.service;

import com.bookstore.bookstore_backend.dto.CategoryDTO;
import com.bookstore.bookstore_backend.entities.CategoryEntity;
import com.bookstore.bookstore_backend.dao.CategoryDao;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryDao categoryDao;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<CategoryDTO> getAllCategories() {
        List<CategoryEntity> entities = categoryDao.findAll();
        return entities.stream().map(c -> modelMapper.map(c, CategoryDTO.class)).collect(Collectors.toList());
    }

    @Override
    public CategoryDTO addCategory(CategoryDTO categoryDTO) {
        CategoryEntity entity = modelMapper.map(categoryDTO, CategoryEntity.class);
        CategoryEntity saved = categoryDao.save(entity);
        return modelMapper.map(saved, CategoryDTO.class);
    }
}
