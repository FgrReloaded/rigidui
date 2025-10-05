# Contributing to RigidUI

Thank you for your interest in contributing to RigidUI! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Component Guidelines](#component-guidelines)
- [Pull Request Process](#pull-request-process)
- [Commit Guidelines](#commit-guidelines)
- [Creating a New Component](#creating-a-new-component)

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to foster an inclusive and respectful community.

## Development Setup

To set up the development environment:

1. **Fork and clone the repository:**

```bash
git clone https://github.com/fgrreloaded/rigidui.git
cd rigidui
```

2. **Install dependencies:**

```bash
pnpm install
```

3. **Start the development server:**

```bash
pnpm run dev
```

4. **Build the registry:**

```bash
pnpm run build
```

## Project Structure

```
rigidui/
├── app/                    # Next.js app directory
│   ├── docs/               # Documentation pages
│   ├── registry/           # Registry API route
│   └── page.tsx            # Homepage
├── components/             # Shared components
├── registry/               # Registry components
│   ├── new-york/           # New York style components
│   │   ├── component-name/ # Individual component directories
│   │   │   ├── component-name.tsx        # Main component file
│   │   │   └── component-name-demo.tsx   # Demo component (optional)
├── lib/                    # Utility functions and hooks
├── registry.json           # Registry configuration file
└── tailwind.config.ts      # Tailwind configuration
```

## Component Guidelines

When developing components for RigidUI, please follow these guidelines:

1. **Self-contained** - Components should be self-contained with minimal external dependencies.
2. **Accessible** - Follow WAI-ARIA guidelines and ensure keyboard navigation works.
3. **Responsive** - Components should work well on all screen sizes.
4. **Customizable** - Use Tailwind CSS classes and accept className props.
5. **TypeScript** - Write proper TypeScript types for all props and functions.
6. **Dark Mode** - Support both light and dark modes.
7. **Documentation** - Include proper JSDoc comments and create demo files.

## Pull Request Process

1. **Create a branch** with a descriptive name:

   ```bash
   git checkout -b feature/component-name
   ```

2. **Make your changes** following the component guidelines.

3. **Test your changes** thoroughly.

4. **Update documentation** if necessary.

5. **Create a changeset** to document your changes:

   ```bash
   npx changeset
   ```

   Follow the prompts to describe your changes.

6. **Commit your changes** following the commit guidelines.

7. **Push your branch** to your fork:

   ```bash
   git push origin feature/component-name
   ```

8. **Create a pull request** to the `main` branch of the original repository.

9. **Respond to feedback** from maintainers if requested.

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) for our commit messages:

- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code changes that neither fix bugs nor add features
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Changes to the build process or auxiliary tools

Example:

```
feat(currency-manager): add support for custom decimal places
```

## Creating a New Component

1. **Create a new directory** in `registry/new-york/` with your component name.

2. **Create the component file** with TypeScript and JSDoc comments:

```tsx
// filepath: registry/new-york/your-component/your-component.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface YourComponentProps {
  /** Description of prop */
  someProp?: string;
  /** Additional class names */
  className?: string;
  /** Children elements */
  children?: React.ReactNode;
}

/**
 * YourComponent - Description of what it does
 */
export function YourComponent({
  someProp = "default",
  className,
  children,
}: YourComponentProps) {
  return (
    <div className={cn("your-default-classes", className)}>
      {/* Component implementation */}
      {children}
    </div>
  );
}
```

3. **Create a demo file** (optional but recommended):

```tsx
// filepath: registry/new-york/your-component/your-component-demo.tsx
"use client";

import React from "react";
import { YourComponent } from "./your-component";

export function YourComponentDemo() {
  return (
    <div className="space-y-8">
      <YourComponent someProp="value">Demo content</YourComponent>

      {/* Add more examples with different props */}
    </div>
  );
}
```

4. **Add your component to the registry** by updating `registry.json`:

```json
{
  "name": "your-component",
  "type": "registry:component",
  "title": "Your Component",
  "description": "Description of your component",
  "registryDependencies": [
    "button" // Add any dependencies here
  ],
  "files": [
    {
      "path": "registry/new-york/your-component/your-component.tsx",
      "type": "registry:component"
    }
  ],
  "author": "Your Name <your.email@example.com>"
}
```

5. **Create documentation** in `app/docs/components/your-component/page.tsx`

Thank you for contributing to RigidUI!
