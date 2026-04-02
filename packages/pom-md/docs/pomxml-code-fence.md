# pomxml Code Fence

For complex diagrams that Markdown cannot express, you can embed pom XML directly using `pomxml` code fences.

## Basic Usage

Wrap pom XML in a fenced code block with the `pomxml` language identifier:

````markdown
```pomxml
<Chart type="bar" labels="Q1,Q2,Q3,Q4" values="100,80,120,150" />
```
````

The content inside `pomxml` fences is passed through to the output XML as-is, without any conversion.

## Examples

### Chart

````markdown
```pomxml
<Chart type="bar" labels="Q1,Q2,Q3,Q4" values="100,80,120,150" />
```
````

### Flow Diagram

````markdown
```pomxml
<Flow>
  <Step>Plan</Step>
  <Step>Develop</Step>
  <Step>Release</Step>
</Flow>
```
````

### Timeline

````markdown
```pomxml
<Timeline>
  <Event>Phase 1</Event>
  <Event>Phase 2</Event>
  <Event>Phase 3</Event>
</Timeline>
```
````

## Mixing Markdown and pomxml

You can freely mix Markdown content and `pomxml` code fences within the same slide:

````markdown
# Project Status

- Overall progress is on track
- Budget within target

```pomxml
<Chart type="bar" labels="Q1,Q2,Q3,Q4" values="100,80,120,150" />
```
````

Each `pomxml` block is inserted into the slide at the position it appears in the Markdown source.

## Available Nodes

Any pom XML node can be used inside a `pomxml` code fence. See the [Nodes](/nodes) reference for the full list of available nodes and their attributes.
