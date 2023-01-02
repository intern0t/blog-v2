---
layout: post
title: "HTTP Status Code in Springboot API Endpoint." 
author: Prashant Shrestha 
date: 2023-01-01 19:40:14 -400 
categories: development 
tags: spring sprintboot, 
---

In order to specify HTTP Status Code in Spring API Endpoint's response, there seem to exist multiple options and workarounds.

**Listed 2 workarounds are the ones that I found to be straightforward to implement.**

- Return `ResponseEntity`
- Throw `ResponseStatusException`

### Return `ResponseEntity`.
The [`ResponseEntity`](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/http/ResponseEntity.html) from `org.springframework.http` was an amazing find. With `ResponseEntity`, we can add or modify multiple metadata of the response we wish to send.

#### Example
```java
import org.springframework.http.ResponseEntity;
```

```java
@DeleteMapping
public ResponseEntity<?> deleteBlock(@RequestBody Block block) {
    Boolean blockDeleted = blockService.deleteBlock(block);

    Map<String, Object> response = new HashMap<>();
    response.put("error", !blockDeleted);
    response.put("message", blockDeleted ? 
        "Successfully deleted the block -> {}".formatted(block) : 
        "Failed to delete the block.");

    return ResponseEntity.status(blockDeleted ? 
        HttpStatus.OK : 
        HttpStatus.NOT_FOUND)
        .body(response);
}
```

### Throw `ResponseStatusException`.
The [`ResponseStatusException`]() from `org.springframework.web.server` is another simple alternative depending on the use-case but for me, simply to modify the HTTP Status Code, I found `ResponseStatusException` to be equally simple.

#### Example
```java
import org.springframework.web.server.ResponseStatusException;
```

```java
@PostMapping
public Map<String, Object> registerBlock(@RequestBody Block block) {
    Boolean blockRegistered = blockService.addblock(block);

    Map<String, Object> response = new HashMap<>();
    response.put("error", !blockRegistered);
    response.put("message", blockRegistered ? 
        "Successfully saved the block information." : 
        "Failed to save the new block in the database.");

    if (!blockRegistered) {
        throw new ResponseStatusException(
            HttpStatus.CONFLICT, 
            "Block with the email {} already exists.".formatted(
                block.getEmail()));
    }

    return response;
}
```

:stuck_out_tongue_winking_eye: