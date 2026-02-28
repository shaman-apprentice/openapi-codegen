package com.zoo.shared.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.validation.constraints.NotNull;

/**
 * Base Animal class with polymorphism support.
 * Subclasses: Rainbowfish, Chameleon
 */
@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    include = JsonTypeInfo.As.EXISTING_PROPERTY,
    property = "name",
    visible = true
)
public class Animal {

    @JsonProperty("name")
    @NotNull
    private String name;

    @JsonProperty("enclosure")
    @NotNull
    private String enclosure;

    public Animal() {
    }

    public Animal(String name, String enclosure) {
        this.name = name;
        this.enclosure = enclosure;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEnclosure() {
        return enclosure;
    }

    public void setEnclosure(String enclosure) {
        this.enclosure = enclosure;
    }
}
