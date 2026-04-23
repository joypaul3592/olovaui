# Code Block

Code Block brings together five command and terminal-style patterns for install snippets, interactive tabs, and expressive code presentation.

## Code Block Simple

A clean, tabbed code block for package manager commands with a copy-to-clipboard button. This is the most straightforward option when you want users to scan, switch, and copy with almost no visual overhead.

    Preview
    Code
  preview
    } reTrigger={true} />
  code

**Works well when**

- You need a reliable install snippet for docs pages.
- The surrounding layout already has strong visual hierarchy.
- You want the lowest-friction pattern for package-manager tabs.

## Code Block Natural

A beautiful, tabbed code block component for displaying package manager commands with copy functionality. It keeps the same practical tab behavior as the simpler variant, but presents the commands with a slightly more refined and productized feel.

    Preview
    Code
  preview
    } reTrigger={true} />
  code

**Works well when**

- You want an install block that feels a bit more premium than a basic snippet.
- The code sample sits near marketing copy or feature highlights.
- You still want a familiar tabbed interaction pattern.

## Code Block Select

A sleek code block with a dropdown selector for switching between package manager commands. This variant trades always-visible tabs for a more compact footprint, which helps in narrow content columns and card layouts.

    Preview
    Code
  preview
    } reTrigger={true} />
  code

**Works well when**

- You are working inside a tighter layout.
- You want to reduce horizontal tab clutter.
- The command surface needs to stay compact on smaller screens.

## Beam Code Block

A terminal-style code block with animated spotlight effects and spring-based tab navigation. This is the showcase variant in the set, designed for product hero areas, launch pages, and demo sections where motion helps tell the story.

    Preview
    Code
  preview
    } reTrigger={true} />
  code

**Works well when**

- The code block is part of the visual centerpiece of the page.
- You want a stronger sense of motion and depth.
- The interaction should feel more premium than purely utilitarian.

## Glitch Block

An animated terminal-style code block with glitching command text, responsive tabs, and a built-in copy action. It leans into a more experimental terminal aesthetic and is a strong fit for bold product storytelling.

    Preview
    Code
  preview
    } reTrigger={true} />
  code

**Works well when**

- You want the terminal treatment to feel more alive and stylized.
- The interface already supports a stronger experimental tone.
- The transition itself should feel like part of the demo.

## Choose A Variant

| Variant | Best For | Interaction Style | Visual Tone |
| --- | --- | --- | --- |
| `Code Block Simple` | Install commands and small utility snippets | Top tabs + copy button | Clean and minimal |
| `Code Block Natural` | Package-manager command switching | Top tabs + copy button | Polished and balanced |
| `Code Block Select` | Tight layouts and compact cards | Dropdown + copy button | Compact and practical |
| `Beam Code Block` | Hero sections and spotlight demos | Animated tabs | Dramatic and premium |
| `Glitch Block` | Experimental interfaces and terminal-inspired moments | Animated tab transitions | Energetic and expressive |

## Shared Patterns

Across the collection, the components focus on a few recurring ideas:

- Clear command presentation with strong contrast and readable spacing.
- Fast switching between package managers or terminal commands.
- Built-in copy affordances for frictionless onboarding.
- Terminal-inspired styling that still works in product docs and landing pages.

## Practical Guidance

If you're choosing quickly, this is a good default order:

1. Start with `Code Block Simple` for documentation-heavy surfaces.
2. Move to `Code Block Natural` when you want a more polished install experience.
3. Use `Code Block Select` when layout space is constrained.
4. Reach for `Beam Code Block` or `Glitch Block` when the code block is part of the page's visual narrative.

## Accessibility And UX Notes

- Keep command strings short enough to remain readable without excessive horizontal scrolling.
- Make the active package manager or tab state visually obvious.
- Preserve a clear copy action so users do not need to manually select command text.
- Use the more animated variants intentionally, especially when multiple moving elements already exist on the page.