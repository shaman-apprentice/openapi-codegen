---
agent: 'agent'
description: 'Create a demo project'
tools: ['search', 'web/fetch', 'edit', 'todo']
---

# Objective 

When the options are valid, read the openapi yaml file from "options.input" and generate an Angular http client library with the name of "options.name". Write all library files to "options.output" path.

## Guidelines

- Be minimalistic
- Use no external libraries but `js-yaml` for reading yaml files
- Use .mjs files with jsdocs for the implementation.
- Only implement needed features for minimalistic `demo-project/jakarta-server/shared-lib/shared.yaml`.
