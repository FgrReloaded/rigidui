# RigidUI

<p align="center">
  <img src="public/logo.png" alt="RigidUI Logo" width="300" />
</p>

<p align="center">
  A collection of enterprise-grade UI components for React and Next.js applications, built on top of shadcn/ui.
</p>

## Features

- 🧩 **Enterprise-ready components** - Complex components for real-world applications
- 🔌 **Powered by shadcn/ui** - Built on the shadcn/ui methodology
- 📦 **Registry-based** - Install only what you need
- 🎨 **Customizable** - Tailwind CSS for styling flexibility
- 🌓 **Dark mode support** - Beautiful in light and dark
- ⚡ **Fast development** - Speed up your workflow with pre-built complex components
- 📱 **Cross-platform** - Web and React Native support for many components
- 🎭 **Creative components** - Beautiful animations and interactive elements
- 🔒 **Security-focused** - Access control and permission management components
- 🎯 **TypeScript first** - Full type safety with Zod integration
- ♿ **Accessible** - Built with accessibility in mind

## Components

RigidUI extends shadcn/ui with additional enterprise-grade components:

### Creative Components

- **Data Reveal** - Animated component that reveals sensitive content with smooth staggered animations and auto-hide functionality
- **Draggable Canvas** - Smooth, physics-based draggable canvas with momentum, elastic bounds, and customizable items
- **Text Shift** - Animated text component that smoothly transitions between two text strings with staggered letter animations
- **Creative Buttons** - Collection of beautiful, animated button components

### Core Components

- **Currency Manager** - Multi-currency conversion and display system
- **Draggable Dashboard** - Interactive drag-and-drop dashboard with customizable widgets
- **Image Loader** - Advanced image loading component with beautiful loading states, error handling, and performance optimizations (Web + React Native)
- **Location Picker** - Geographic location selection with map integration and search functionality (Web + React Native)
- **Guided Tour** - Comprehensive guided tour component for interactive step-by-step walkthroughs
- **Smart Search** - Advanced search component with real-time results, filters, history, and keyboard navigation

### Form Elements

- **File Uploader** - Drag and drop file upload with previews, validation, and progress tracking (Web + React Native)
- **Multi-Step Form Wrapper** - Guided step-by-step form interfaces with progress indicators
- **Password Strength Meter** - Visual password strength evaluation component with customizable rules
- **Smart Form** - Zod-powered form component with TanStack Query integration and automatic validation

### Data Display

- **Content Grid** - Flexible grid/list component with seamless view switching and customizable rendering
- **File Explorer** - Hierarchical file system browser with syntax highlighting and file operations
- **Infinite Scroll** - Efficiently load large datasets with infinite scrolling and virtual rendering (Web + React Native)
- **Notification Center** - Comprehensive notification management system with categories and actions

### Security & Access

- **Access Manager** - Authentication and authorization system with session validation for controlling UI visibility and user permissions

### Hooks

- **useLocation** - Custom hook for location-based functionality and geolocation services

## Installation

### Prerequisites

RigidUI components require a project with the following setup:

- ✅ **Tailwind CSS** installed and configured
- ✅ **shadcn/ui** initialized in your project
- ✅ **TypeScript** support

### Install Components

Add RigidUI components to your project with a single command:

#### Creative Components

```bash
# Data Reveal
npx shadcn@latest add https://rigidui.com/r/data-reveal.json

# Draggable Canvas
npx shadcn@latest add https://rigidui.com/r/draggable-canvas.json

# Text Shift
npx shadcn@latest add https://rigidui.com/r/text-shift.json
```

#### Core Components

```bash
# Access Manager
npx shadcn@latest add https://rigidui.com/r/access-manager.json

# Content Grid
npx shadcn@latest add https://rigidui.com/r/content-grid.json

# Currency Manager
npx shadcn@latest add https://rigidui.com/r/currency-manager.json

# Draggable Dashboard
npx shadcn@latest add https://rigidui.com/r/draggable-dashboard.json

# Guided Tour
npx shadcn@latest add https://rigidui.com/r/guided-tour.json

# Image Loader (Web)
npx shadcn@latest add https://rigidui.com/r/image-loader.json

# Image Loader (React Native)
npx shadcn@latest add https://rigidui.com/r/image-loader-rn.json

# Location Picker (Web)
npx shadcn@latest add https://rigidui.com/r/location-picker.json

# Location Picker (React Native)
npx shadcn@latest add https://rigidui.com/r/location-picker-rn.json

# Smart Search
npx shadcn@latest add https://rigidui.com/r/smart-search.json
```

#### Form Elements

```bash
# File Uploader (Web)
npx shadcn@latest add https://rigidui.com/r/file-uploader.json

# File Uploader (React Native)
npx shadcn@latest add https://rigidui.com/r/file-uploader-rn.json

# Multi-Step Form Wrapper
npx shadcn@latest add https://rigidui.com/r/multi-step-form-wrapper.json

# Password Strength Meter
npx shadcn@latest add https://rigidui.com/r/strength-meter.json

# Smart Form
npx shadcn@latest add https://rigidui.com/r/smart-form.json
```

#### Data Display

```bash
# File Explorer
npx shadcn@latest add https://rigidui.com/r/file-explorer.json

# Infinite Scroll (Web)
npx shadcn@latest add https://rigidui.com/r/infinite-scroll.json

# Infinite Scroll (React Native)
npx shadcn@latest add https://rigidui.com/r/infinite-scroll-rn.json

# Notification Center
npx shadcn@latest add https://rigidui.com/r/notification-center.json
```

#### Hooks

```bash
# useLocation Hook
npx shadcn@latest add https://rigidui.com/r/use-location.json
```

That's it! Components will be added to your `components/ui` directory and are fully customizable.

## Next Steps

Once you have RigidUI components installed:

- **Browse Components** - Explore all available components with live examples in our [documentation](https://rigidui.com/docs/components)
- **View on GitHub** - Star the repo and contribute to the project at [github.com/FgrReloaded/rigidui](https://github.com/FgrReloaded/rigidui)

## Documentation

Visit our documentation site for detailed usage examples and API references:

[RigidUI Documentation](https://rigidui.com/docs)

## Development

To set up the development environment:

```bash
# Clone the repository
git clone https://github.com/FgrReloaded/rigidui.git
cd rigidui

# Install dependencies
npm install

# Start development server
npm run dev
```

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](./CONTRIBUTING.md) for details on how to submit components, report issues, and more.

## License

RigidUI is licensed under the [MIT License](./LICENSE).
