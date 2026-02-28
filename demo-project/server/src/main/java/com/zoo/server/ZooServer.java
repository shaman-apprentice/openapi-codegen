package com.zoo.server;

import org.glassfish.jersey.jetty.JettyHttpContainerFactory;
import org.glassfish.jersey.server.ResourceConfig;

import java.net.URI;

/**
 * Zoo API Server - serves aquatic and terrestrial animal endpoints.
 */
public class ZooServer {

    public static final String BASE_URI = "http://localhost:8080/";

    public static void main(String[] args) {
        try {
            ResourceConfig config = new ZooApplication();
            
            var server = JettyHttpContainerFactory.createServer(
                URI.create(BASE_URI), 
                config
            );
            
            System.out.println("Zoo API Server started at " + BASE_URI);
            System.out.println("Swagger UI available at " + BASE_URI + "swagger-ui/");
            System.out.println("OpenAPI spec available at " + BASE_URI + "openapi.json");
            System.out.println("Press Ctrl+C to stop the server...");
            
            Runtime.getRuntime().addShutdownHook(new Thread(() -> {
                try {
                    System.out.println("Shutting down server...");
                    server.stop();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }));
            
            server.join();
        } catch (Exception e) {
            e.printStackTrace();
            System.exit(1);
        }
    }
}
