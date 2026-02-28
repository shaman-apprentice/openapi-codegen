package com.zoo.server;

import io.swagger.v3.jaxrs2.integration.resources.OpenApiResource;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.integration.SwaggerConfiguration;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.ServerProperties;

import com.zoo.server.resource.AquaticResource;
import com.zoo.server.resource.SwaggerUIResource;
import com.zoo.server.resource.TerrestrialResource;

import java.util.Set;

/**
 * JAX-RS Application configuration for Zoo API.
 */
@OpenAPIDefinition(
    info = @Info(
        title = "Zoo API",
        version = "1.0.0",
        description = "Combined API for aquatic and terrestrial animals"
    )
)
public class ZooApplication extends ResourceConfig {

    public ZooApplication() {
        property(ServerProperties.WADL_FEATURE_DISABLE, true);

        register(AquaticResource.class);
        register(TerrestrialResource.class);
        register(SwaggerUIResource.class);
        
        register(JacksonFeature.class);
        register(JacksonConfig.class);
        
        OpenApiResource openApiResource = new OpenApiResource();
        openApiResource.setOpenApiConfiguration(new SwaggerConfiguration()
                .resourcePackages(Set.of("com.zoo.server.resource")));
        register(openApiResource);
    }
}
