# Zoo API Demo Project

A Maven multi-module project demonstrating OpenAPI schema design with nice polymorphism support and code reuse between multiple API specifications.

## Frontend

Generate types: `node ./bin/generate-angular-contract.mjs -n "@zoo/shared-lib" -i demo-project/jakarta-server/shared-lib/shared.yaml -o demo-project/jakarta-server/shared-lib/target/angular-contract`

## Server

### Building

From `demo-project/jakarta-server` directory:

```bash
mvn clean install
```

### Running the Server

After building:

```bash
java -jar server/target/server-1.0.0-SNAPSHOT.jar
```

The server starts at *http://localhost:8080*, swagger-ui is reachable at *http://localhost:8080/swagger-ui*
