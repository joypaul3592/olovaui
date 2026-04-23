# Olova UI -

> **Modern React Component Library with 500+ Animated Components**

Beautifully designed React components you can copy and paste into your apps. Accessible. Customizable. Open Source. Built with Tailwind CSS, Framer Motion, and TypeScript.

## ✨ Features

- 🎨 **Modern Design**: Clean and beautiful UI components with smooth animations
- ⚡ **High Performance**: Built with performance and accessibility in mind
- 🧱 **Easy to Customize**: Easily themeable with Tailwind CSS
- 🔄 **Smooth Animations**: Powered by the excellent `framer-motion` library
- 🧩 **Icons Included**: `lucide-react` icons are integrated out of the box
- 📱 **Responsive Design**: Mobile-first approach with responsive components
- 🌙 **Dark Mode**: Built-in dark mode support
- 🚀 **Static Export**: Optimized for static site generation
- 📊 **Performance Monitoring**: Built-in performance tracking and optimization

## 🚀 Getting Started

You can add Olova UI components to your project in two ways: using our CLI for a quick setup or by manually copying the component code for more control.

### CLI Installation

Our CLI will guide you through the process of adding components to your project. Here's an example of how to add the `Button` component:

```bash
# Using pnpm
pnpm dlx shadcn@latest add "https://olovaui.olova.net/registry/button.json"

# Using npm
npx shadcn@latest add "https://olovaui.olova.net/registry/button.json"

# Using yarn
yarn dlx shadcn@latest add "https://olovaui.olova.net/registry/button.json"

# Using bun
bunx shadcn@latest add "https://olovaui.olova.net/registry/button.json"
```

### Manual Installation

For manual installation, you can copy and paste the component code directly from our documentation into your project.

1. **Choose a Component**: Browse our component library and find what you need
2. **Copy the Code**: View and copy the source code for each component
3. **Paste and Customize**: Paste the code into your project and customize it to fit your needs

## 📦 Installation

### Prerequisites

Make sure you have the following dependencies installed in your project:

```bash
npm install tailwindcss framer-motion class-variance-authority clsx tailwind-merge lucide-react
```

### Setup

1. Install the required dependencies
2. Configure your `tailwind.config.js` to include the component paths
3. Add the CSS variables to your `globals.css`
4. Start using the components!

## 🧩 Available Components

### UI Components
- **Button** - Interactive button with ripple effects and loading states
- **Card** - Flexible card component for content display
- **Accordion** - Collapsible content sections
- **Tabs** - Tabbed navigation with multiple styles
- **Dropdown** - Dropdown menu component
- **Search** - Search input with fuzzy search capabilities
- **Login** - Complete login form component
- **Password** - Password input with strength indicator
- **Two-Step** - Two-step verification component

### Advanced Components
- **Flip Words** - Animated text flipping effect
- **Fuzzy** - Fuzzy search interface
- **Pattern** - Beautiful background patterns
- **Prompt** - AI prompt input component
- **Amazon Gift** - Gift card styled component
- **Dock** - macOS-style dock navigation
- **Spotlight Card** - Spotlight effect card
- **Text Reveal** - Text animation reveal
- **Toast** - Notification component
- **Strong Password** - Advanced password input

## 🎯 Component Example

Here's an example of our Button component:

```tsx
'use client'

import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg';
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', children, loading, onClick, iconLeft, iconRight, ...props }, ref) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);
    
    const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (loading) return;
      
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const rippleSize = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - rippleSize / 2;
      const y = event.clientY - rect.top - rippleSize / 2;
      
      const newRipple: Ripple = { x, y, size: rippleSize, id: Date.now() };
      setRipples(currentRipples => [...currentRipples, newRipple]);
      
      setTimeout(() => {
        setRipples(currentRipples => currentRipples.slice(1));
      }, 700);
      
      onClick?.(event);
    };
    
    return (
      <button
        className={cn(
          "relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-transform duration-75 focus:outline-none disabled:opacity-50 disabled:pointer-events-none overflow-hidden active:scale-[0.97] cursor-pointer",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        onClick={createRipple}
        disabled={loading}
        ref={ref}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {loading && <Loader2 className="h-4 w-4" />}
          {!loading && iconLeft && <span>{iconLeft}</span>}
          {children}
          {!loading && iconRight && <span>{iconRight}</span>}
        </span>
        
        {!loading && (
          <div className="absolute inset-0 z-0">
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                className={cn("absolute rounded-full animate-ripple", rippleColor)}
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  width: ripple.size,
                  height: ripple.size
                }}
              />
            ))}
          </div>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
```

## 🛠️ Development

### Project Structure

```
olovaui/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── (landing)/          # Landing page
│   │   ├── docs/               # Documentation pages
│   │   └── standalone/         # Component standalone pages
│   ├── components/             # Reusable components
│   │   ├── ui/                 # UI components
│   │   ├── layout/             # Layout components
│   │   ├── documentation/      # Documentation components
│   │   ├── performance/        # Performance monitoring
│   │   └── seo/                # SEO components
│   ├── lib/                    # Utility functions
│   ├── hooks/                  # Custom React hooks
│   ├── context/                # React contexts
│   └── assets/                 # Static assets
├── public/
│   └── registry/               # Component registry files
├── scripts/                    # Build and generation scripts
└── package.json
```

### Scripts

- `dev` - Start development server with Turbopack
- `build` - Build for production
- `build:analyze` - Build with bundle analyzer
- `build:registry` - Build component registry
- `generate:components` - Auto-generate components
- `watch:components` - Watch for component changes
- `perf:audit` - Run Lighthouse performance audit
- `perf:bundle` - Analyze bundle size
- `perf:optimize` - Optimize build

### Performance Features

- **Bundle Analysis**: Built-in bundle analyzer for optimization
- **Performance Monitoring**: Real-time performance tracking
- **Resource Preloading**: Critical resource preloading
- **Web Vitals**: Core Web Vitals monitoring
- **SEO Optimization**: Comprehensive SEO implementation
- **Static Export**: Optimized for static site generation

## 🌟 Why Olova UI?

> "I'm a JavaScript library creator from Bangladesh, not a professional designer. But after building several front-end projects, I realized I needed my own UI system to streamline everything."

Olova UI is born from real development needs — built by a developer, for developers. It focuses on:

- **Developer Experience**: Easy to use and integrate
- **Performance**: Optimized for production use
- **Accessibility**: Built with accessibility in mind
- **Customization**: Easy to theme and customize
- **Modern Stack**: Built with the latest technologies

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © [Olova UI Team](https://github.com/olovaui)

## 🔗 Links

- [Documentation](https://olovaui.olova.net/docs)
- [Components](https://olovaui.olova.net)
- [GitHub](https://github.com/olovalabs/olovaui)
- [Sponsor](https://olovaui.olova.net/sponsor)
- [Sera Chat](https://ai.olova.net.com/)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Inspiration for the component structure
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide React](https://lucide.dev/) - Icon library
- [Next.js](https://nextjs.org/) - React framework

---

**Built with ❤️ by [Nazmul Hossain](https://www.linkedin.com/in/codernazmulhossain/) in Bangladesh**

