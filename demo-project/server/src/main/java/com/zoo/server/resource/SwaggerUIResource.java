package com.zoo.server.resource;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.io.InputStream;

/**
 * Resource for serving Swagger UI from WebJars.
 */
@io.swagger.v3.oas.annotations.Hidden
@Path("/swagger-ui")
public class SwaggerUIResource {

    private static final String SWAGGER_UI_VERSION = "5.10.3";
    private static final String WEBJAR_PATH = "/META-INF/resources/webjars/swagger-ui/" + SWAGGER_UI_VERSION + "/";

    @GET
    @Path("/")
    @Produces(MediaType.TEXT_HTML)
    public Response getIndex() {
        String html = """
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Zoo API - Swagger UI</title>
                <link rel="stylesheet" type="text/css" href="swagger-ui.css">
            </head>
            <body>
                <div id="swagger-ui"></div>
                <script src="swagger-ui-bundle.js"></script>
                <script src="swagger-ui-standalone-preset.js"></script>
                <script>
                    window.onload = function() {
                        SwaggerUIBundle({
                            url: "/openapi.json",
                            dom_id: '#swagger-ui',
                            presets: [
                                SwaggerUIBundle.presets.apis,
                                SwaggerUIStandalonePreset
                            ],
                            layout: "StandaloneLayout"
                        });
                    };
                </script>
            </body>
            </html>
            """;
        return Response.ok(html).build();
    }

    @GET
    @Path("/{file}")
    public Response getSwaggerUIFile(@PathParam("file") String file) {
        String mediaType = getMediaType(file);
        InputStream resource = getClass().getResourceAsStream(WEBJAR_PATH + file);
        
        if (resource == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        
        return Response.ok(resource).type(mediaType).build();
    }

    private String getMediaType(String file) {
        if (file.endsWith(".css")) {
            return "text/css";
        } else if (file.endsWith(".js")) {
            return "application/javascript";
        } else if (file.endsWith(".png")) {
            return "image/png";
        } else if (file.endsWith(".html")) {
            return MediaType.TEXT_HTML;
        }
        return MediaType.APPLICATION_OCTET_STREAM;
    }
}
