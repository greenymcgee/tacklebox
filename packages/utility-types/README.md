# Utility Types

These are a set of utility types that I use in my projects.

## Installation

### npm

```bash
npm install -D @greenymcgee/utility-types
```

### pnpm

```bash
pnpm add -D @greenymcgee/utility-types
```

## Usage

Add this to your project's `tsconfig.json` file.

```ts
"compilerOptions": {
  "types": ["@greenymcgee/utility-types"]
}
```

## Types

### FirstParameterOf

Used to get the first parameter of a function.

```ts
type YourType = FirstParameterOf<typeof yourFunction>
```

### SecondParameterOf

Used to get the second parameter of a function.

```ts
type YourType = SecondParameterOf<typeof yourFunction>
```

### ThirdParameterOf

Used to get the third parameter of a function.

```ts
type YourType = ThirdParameterOf<typeof yourFunction>
```

### PropsOf

Used to get the props of a component.

```ts
type YourProps = PropsOf<typeof YourComponent>
```

### OneOf

Used to get the first element of an array. Very useful if you have
an array of typed objects, but don't need a type for the objects themselves.

```ts
type YourType = OneOf<typeof yourArray>
```