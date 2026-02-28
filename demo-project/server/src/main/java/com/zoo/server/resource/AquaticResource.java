package com.zoo.server.resource;

import com.zoo.aquatic.model.Rainbowfish;
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
 * REST resource for aquatic animals.
 */
@Path("/")
@Tag(name = "Aquatic Animals", description = "API for aquatic animals")
public class AquaticResource {

    @GET
    @Path("/rainbowfish")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(
        summary = "Get a rainbowfish",
        description = "Returns a rainbowfish specimen"
    )
    @ApiResponse(
        responseCode = "200",
        description = "A rainbowfish",
        content = @Content(
            mediaType = MediaType.APPLICATION_JSON,
            schema = @Schema(implementation = Rainbowfish.class)
        )
    )
    public Rainbowfish getRainbowfish() {
        return new Rainbowfish("Tropical Tank A", "iridescent blue");
    }
}
