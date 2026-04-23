# 📖 How to Hide Table of Contents

This page demonstrates how to hide the table of contents on specific pages using the `HideTOC` component.

## Usage

To hide the table of contents on any page, simply import and use the `HideTOC` component at the top of your MDX file:

```tsx

<HideTOC />

// Your page content here...
```

## Example

Here's a complete example of how to use it in an MDX file:

<CodeBlock language="tsx" code={`import { HideTOC } from "@/components/layout/hide-toc";


# My Page Title

This page will not show the table of contents.

## Section 1

Content here...

## Section 2

More content here...`} />

## Features

- ✅ **Easy to use**: Just add one component to your MDX file
- ✅ **Automatic cleanup**: TOC is restored when navigating away from the page
- ✅ **No layout shift**: The main content area automatically adjusts
- ✅ **Future-proof**: Can be used on any page where you don't want TOC

## When to Use

Consider hiding the TOC when:
- The page has minimal content that doesn't need navigation
- You want a cleaner, more focused layout
- The page is primarily interactive components
- You're creating landing pages or special layouts
- You want the content to use the full available width

## Layout Behavior

When you use ``:
- ✅ **TOC is completely hidden** - No empty space left behind
- ✅ **Content expands to full width** - Main content area automatically extends to use the space where TOC was
- ✅ **Responsive design maintained** - Layout adjusts properly on all screen sizes
- ✅ **Automatic cleanup** - TOC returns when navigating to other pages

## Import Statement

```tsx

```

Simply add this import to any MDX page where you want to hide the table of contents.