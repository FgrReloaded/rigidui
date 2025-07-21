import { NavigationItem } from "./types";

export const navigationItems: NavigationItem[] = [
  {
    title: "Getting Started",
    href: "/docs/getting-started",
  },
  {
    title: "Components",
    href: "/docs/components",
    isCollapsed: false,
    items: [
      { title: "Content Grid", href: "/docs/components/content-grid" },
      { title: "Currency Manager", href: "/docs/components/currency-manager" },
      {
        title: "Draggable Dashboard",
        href: "/docs/components/draggable-dashboard",
      },
      { title: "File Explorer", href: "/docs/components/file-explorer" },
      { title: "File Uploader", href: "/docs/components/file-uploader" },
      { title: "Guided Tour", href: "/docs/components/guided-tour" },
      { title: "Image Loader", href: "/docs/components/image-loader" },
      { title: "Infinite Scroll", href: "/docs/components/infinite-scroll" },
      { title: "Location Picker", href: "/docs/components/location-picker" },
      {
        title: "Multi-Step Form Wrapper",
        href: "/docs/components/multi-step-form-wrapper",
      },
      {
        title: "Notification Center",
        href: "/docs/components/notification-center",
      },
      {
        title: "Password Strength Meter",
        href: "/docs/components/strength-meter",
      },
      { title: "Smart Form", href: "/docs/components/smart-form" },
      { title: "Smart Search", href: "/docs/components/smart-search" },
    ],
  },
  {
    title: "Hooks",
    href: "/docs/hooks",
    items: [{ title: "useLocation", href: "/docs/hooks/use-location" }],
  },
];

// Components showcase for homepage
export const components = [
  {
    name: "currency-manager",
    title: "Currency Manager",
    description:
      "Advanced currency management with real-time exchange rates, conversion capabilities, and support for 180+ currencies worldwide.",
  },
  {
    name: "draggable-dashboard",
    title: "Draggable Dashboard",
    description:
      "Create interactive dashboards with drag-and-drop functionality, resizable widgets, and customizable layouts.",
  },
  {
    name: "file-explorer",
    title: "File Explorer",
    description:
      "Comprehensive file system explorer with syntax highlighting, image preview, and search functionality.",
  },
  {
    name: "file-uploader",
    title: "File Uploader",
    description:
      "Robust file upload component with drag & drop support, progress tracking, validation, and image cropping.",
  },
  {
    name: "guided-tour",
    title: "Guided Tour",
    description:
      "Interactive onboarding system to guide users through features with customizable steps and positioning.",
  },
  {
    name: "image-loader",
    title: "Image Loader",
    description:
      "Smart image loading with skeleton placeholders, error handling, and progressive enhancement.",
  },
  {
    name: "infinite-scroll",
    title: "Infinite Scroll",
    description:
      "Efficient infinite scrolling with virtual rendering, lazy loading, and smooth user experience.",
  },
  {
    name: "location-picker",
    title: "Location Picker",
    description:
      "Geographic location selection with map integration, address search, and coordinate management.",
  },
  {
    name: "multi-step-form-wrapper",
    title: "Multi-Step Form",
    description:
      "Sophisticated multi-step form system with validation, progress tracking, and step management.",
  },
  {
    name: "notification-center",
    title: "Notification Center",
    description:
      "Centralized notification management with real-time updates, categories, and action handling.",
  },
  {
    name: "smart-search",
    title: "Smart Search",
    description:
      "Intelligent search with auto-suggestions, history, filters, and keyboard navigation.",
  },
  {
    name: "strength-meter",
    title: "Password Strength",
    description:
      "Real-time password strength validation with customizable criteria and visual feedback.",
  },
  {
    name: "smart-form",
    title: "Smart Form",
    description:
      "Advanced form handling with dynamic validation, conditional fields, and smart auto-completion.",
  },
  {
    name: "content-grid",
    title: "Content Grid",
    description:
      "Flexible content display with grid/list toggle, filtering, sorting, and responsive layouts.",
  },
];
