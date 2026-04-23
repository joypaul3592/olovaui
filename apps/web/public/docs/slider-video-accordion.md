# Video Accordion

A cinematic expanding video gallery built with Framer Motion. It keeps one panel visually dominant while the rest compress into a compact rail, making it useful for portfolio reels, storytelling sections, and editorial landing pages.

    Preview
    Code
  preview
    } reTrigger={true} />
  code

## Features

- **Expanding panels**: The active card grows smoothly while inactive cards collapse into narrow previews.
- **Cinematic blur transitions**: Non-active videos soften and scale back to reinforce focus.
- **Responsive layout**: Stacks vertically on smaller screens and switches to a wide horizontal composition on desktop.
- **Optional Pexels loading**: Provide an API key to replace the demo content with fetched videos.

## Usage

```tsx

const cards = [
  {
    id: 1,
    title: "Ocean Stories",
    video: "https://videos.pexels.com/video-files/855327/855327-hd_1920_1080_25fps.mp4",
    desc: "A calm opener for immersive campaign pages.",
  },
  {
    id: 2,
    title: "Mountain Light",
    video: "https://videos.pexels.com/video-files/1365425/1365425-hd_1920_1080_24fps.mp4",
    desc: "A bright, high-contrast clip for travel storytelling.",
  },
];

export function Example() {
  return <VideoAccordion cards={cards} />;
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `cards` | `VideoAccordionCard[]` | `DEFAULT_CARDS` | Video panel content used when no remote fetch is configured. |
| `pexelsApiKey` | `string` | `undefined` | Optional Pexels API key for loading dynamic videos. |
| `query` | `string` | `"nature"` | Search term used when fetching videos from Pexels. |
| `perPage` | `number` | `10` | Number of videos requested from Pexels. |
| `loadingText` | `string` | `"Loading stunning videos..."` | Message shown while remote videos are loading. |
| `className` | `string` | `""` | Additional classes for the outer container. |
| `onActiveChange` | `(cardId: VideoAccordionCard["id"] \| null) => void` | `undefined` | Callback fired when the active panel changes. |

### VideoAccordionCard Type

```tsx
export interface VideoAccordionCard {
  id: number | string;
  title: string;
  video: string;
  desc: string;
}
```

## Notes

- Keep the component inside a tall container so the motion and typography have enough room to breathe.
- If you supply `pexelsApiKey`, the fetched content replaces the local `cards` array after the request resolves.