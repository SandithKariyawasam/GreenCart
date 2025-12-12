package com.example.Greencart.controller;

import com.example.Greencart.entity.Role;
import com.example.Greencart.repository.RoleRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin(origins = "*")
public class RoleController {

    @Autowired
    private RoleRepository roleRepository;

    private final ObjectMapper mapper = new ObjectMapper();

    @GetMapping
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @PostMapping
    public Role createRole(@RequestBody Map<String, Object> payload) throws JsonProcessingException {
        String name = (String) payload.get("name");

        Object permissionsObj = payload.get("permissions");

        if (roleRepository.existsByName(name)) {
            throw new RuntimeException("Role name already exists!");
        }

        Role role = new Role();
        role.setName(name);

        String permissionsJson = mapper.writeValueAsString(permissionsObj);
        role.setPermissions(permissionsJson);

        return roleRepository.save(role);
    }
}