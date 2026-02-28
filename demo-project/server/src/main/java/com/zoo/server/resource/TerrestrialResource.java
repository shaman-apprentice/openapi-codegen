package com.zoo.server.resource;

import com.zoo.terrestrial.model.Chameleon;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

/**
 * REST resource for terrestrial animals.
 */
@Path("/")
@Tag(name = "Terrestrial Animals", description = "API for terrestrial animals")
public class TerrestrialResource {

    @GET
    @Path("/chameleon")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(
        summary = "Get a chameleon",
        description = "Returns a chameleon specimen"
    )
    @ApiResponse(
        responseCode = "200",
        description = "A chameleon",
        content = @Content(
            mediaType = MediaType.APPLICATION_JSON,
            schema = @Schema(implementation = Chameleon.class)
        )
    )
    public Chameleon getChameleon() {
        return new Chameleon("Rainforest Terrarium B", 95);
    }
}
