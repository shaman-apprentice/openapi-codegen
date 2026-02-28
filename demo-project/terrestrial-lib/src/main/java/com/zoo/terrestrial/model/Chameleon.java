package com.zoo.terrestrial.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;
import com.zoo.shared.model.Animal;
import jakarta.validation.constraints.NotNull;

/**
 * Chameleon - extends Animal with terrestrial-specific properties.
 */
public class Chameleon extends Animal {

    /**
     * Fixed name enum for discriminator.
     */
    public enum NameEnum {
        CHAMELEON("chameleon");

        private final String value;

        NameEnum(String value) {
            this.value = value;
        }

        @JsonValue
        public String getValue() {
            return value;
        }

        @Override
        public String toString() {
            return value;
        }
    }

    @JsonProperty("camouflageLevel")
    @NotNull
    private Integer camouflageLevel;

    public Chameleon() {
        super(NameEnum.CHAMELEON.getValue(), null);
    }

    public Chameleon(String enclosure, Integer camouflageLevel) {
        super(NameEnum.CHAMELEON.getValue(), enclosure);
        this.camouflageLevel = camouflageLevel;
    }

    public Integer getCamouflageLevel() {
        return camouflageLevel;
    }

    public void setCamouflageLevel(Integer camouflageLevel) {
        this.camouflageLevel = camouflageLevel;
    }
}
