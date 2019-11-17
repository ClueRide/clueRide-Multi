# Responsibility
Service that wraps the Device's GPS service.

This allow injection of the service when the underlying implementation
is a global that we can't inject. Makes testing easier when we can mock 
the implementation.
