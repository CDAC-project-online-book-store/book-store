package com.bookstore.bookstore_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ReviewSummaryDTO {

    private Long id;
    private Long userId;
    private String userName;
    private Long bookId;
    private int rating;
    private String comments;
}


