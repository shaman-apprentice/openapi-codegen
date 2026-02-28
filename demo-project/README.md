# Zoo API Demo Project

A Maven multi-module project demonstrating OpenAPI schema design with nice polymorphism support and code reuse between multiple API specifications.

## Building

From the `demo-project` directory:

```bash
mvn clean install
```

## Running the Server

After building:

```bash
java -jar server/target/server-1.0.0-SNAPSHOT.jar
```

The server starts at `http://localhost:8080/`

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/rainbowfish` | GET | Returns a Rainbowfish JSON |
| `/chameleon` | GET | Returns a Chameleon JSON |
| `/swagger-ui/` | GET | Swagger UI |
| `/openapi.json` | GET | OpenAPI specification |

## Testing the API

```bash
# Get a rainbowfish
curl http://localhost:8080/rainbowfish

# Get a chameleon
curl http://localhost:8080/chameleon

# Get OpenAPI spec
curl http://localhost:8080/openapi.json
```

## Polymorphism Support

The project demonstrates OpenAPI 3.1 polymorphism using:

- **Discriminator**: The `Animal` type uses `name` as the discriminator property
- **allOf composition**: `Rainbowfish` and `Chameleon` extend `Animal` using `allOf`
- **Cross-file references**: Child specs reference the shared `Animal` schema

Example inheritance:

```
Animal (discriminator: name)
├── Rainbowfish (name: "rainbowfish", mainColor: string)
└── Chameleon (name: "chameleon", camouflageLevel: integer)
```

## Module Dependencies

```
shared-lib (Animal base class)
    ↑
    ├── aquatic-lib (Rainbowfish extends Animal)
    ├── terrestrial-lib (Chameleon extends Animal)
    └── server (depends on all three libs)
```

## Code Reuse Pattern

The model classes demonstrate reuse:

1. **shared-lib** contains the `Animal` base class with Jackson polymorphism annotations
2. **aquatic-lib** and **terrestrial-lib** extend `Animal` with domain-specific properties
3. **server** integrates all libraries and exposes REST endpoints

This pattern allows:
- Shared types across multiple API specifications
- Independent versioning of each module
- Clean separation of concerns
