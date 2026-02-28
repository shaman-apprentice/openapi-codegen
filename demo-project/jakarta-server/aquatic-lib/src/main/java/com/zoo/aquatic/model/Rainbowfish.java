package com.zoo.aquatic.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;
import com.zoo.shared.model.Animal;
import jakarta.validation.constraints.NotNull;

/**
 * Rainbowfish - extends Animal with aquatic-specific properties.
 */
public class Rainbowfish extends Animal {

    /**
     * Fixed name enum for discriminator.
     */
    public enum NameEnum {
        RAINBOWFISH("rainbowfish");

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

    @JsonProperty("mainColor")
    @NotNull
    private String mainColor;

    public Rainbowfish() {
        super(NameEnum.RAINBOWFISH.getValue(), null);
    }

    public Rainbowfish(String enclosure, String mainColor) {
        super(NameEnum.RAINBOWFISH.getValue(), enclosure);
        this.mainColor = mainColor;
    }

    public String getMainColor() {
        return mainColor;
    }

    public void setMainColor(String mainColor) {
        this.mainColor = mainColor;
    }
}
