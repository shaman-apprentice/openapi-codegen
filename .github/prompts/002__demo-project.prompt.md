---
agent: 'agent'
description: 'Create a demo project'
tools: ['search', 'web/fetch', 'edit', 'todo']
---

# Objective 

Create a demo project for the upcoming openapi codegen library.

# Goal

We want better support for:
- Polymorphism
- Reuse of generated code between multiple multiple packages, each providing one openapi yaml file.

Now that we have three openapi yaml specs, I want to create a Server for them.

# Guidelines

- Keep dependencies minimal
- Use Maven for dependency management
- Keep examples, artifacts, etc. minimal

# Inputs

Use these existing OpenAPI files in `demo-project/`:
- `shared.yaml`
- `aquntic-animals.yaml`
- `terrestrial-animals.yaml`

# Deliverables

Create a Maven multi-module project under `demo-project/` with:

1. `shared-lib`  
   - Java library generated from `shared.yaml`

2. `aquatic-lib`  
   - Java library generated from `aquntic-animals.yaml`
   - Reuses shared generated types where applicable

3. `terrestrial-lib`  
   - Java library generated from `terrestrial-animals.yaml`
   - Reuses shared generated types where applicable

4. `server`  
   - Jakarta Servlet-based server consuming the three libraries
   - Implements REST endpoints from aquatic + terrestrial specs
   - Serves OpenAPI docs and Swagger UI for the combined API

# Acceptance Criteria

- Server starts successfully
- `GET /rainbowfish` returns 200 with valid JSON for Rainbowfish
- `GET /chameleon` returns 200 with valid JSON for Chameleon
- Swagger UI is reachable and references the expected API
- Regeneration flow is documented and repeatable

Don't stop until you have created and verified all requested deliverables.
