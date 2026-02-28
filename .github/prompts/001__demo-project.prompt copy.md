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

As a demo project, we want to use a zoo. Setup openapi yaml specs for the follwowing scenario:

- A shared.yaml, which defines an animal
- A aquntic-animals.yaml, which defines a rainbowfish which is animal
- A terrestrial-animals.yaml, which defines a chameleon which is an animal

# Guidelines

- Keep examples, artifacts, etc. minimal

# Deliverables

Create only openapi yaml files for the demo and nothing else.
