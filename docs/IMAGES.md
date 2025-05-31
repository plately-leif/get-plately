# Image Usage Best Practices

This document outlines how to use images in this project, following our conventions and Next.js best practices.

## 1. Use the `next/image` Component
- Always use the `Image` component from `next/image` for all images (not the standard `<img>` tag).
- This provides automatic image optimization, lazy loading, and better performance.

## 2. Import Images or Use URLs
- **For local images:**
  ```tsx
  import myImage from 'public/images/my-image.jpg';
  <Image src={myImage} alt="Descriptive alt text" width={500} height={300} />
  ```
- **For remote images:**
  ```tsx
  <Image src="https://example.com/image.jpg" alt="Descriptive alt text" width={500} height={300} />
  ```

## 3. Always Provide `alt` Text
- The `alt` prop is required and should be descriptive for accessibility and SEO.

## 4. Specify `width` and `height`
- Always provide `width` and `height` props (unless using `fill` layout).
- This helps prevent layout shift and improves performance.

## 5. Use the `fill` Prop for Responsive Images
- If you want the image to fill its parent container, use `fill` and set the parent to `position: relative`:
  ```tsx
  <div style={{ position: 'relative', width: 300, height: 200 }}>
    <Image src={myImage} alt="..." fill style={{ objectFit: 'cover' }} />
  </div>
  ```

## 6. Avoid Inline Styles for Spacing
- Use classNames or CSS modules for styling, not inline styles (except for layout/positioning as above).

## 7. Use Descriptive File Names and Alt Text
- Image file names and alt text should be meaningful and relevant to the content.

## 8. Organize Images in the `public/` Directory
- Store local images in the `public/` directory, ideally under a subfolder like `public/images/`.

---

### Example
```tsx
import Image from 'next/image';
import heroImage from 'public/images/hero.jpg';

export default function Hero() {
  return (
    <section>
      <Image
        src={heroImage}
        alt="A delicious plate of food"
        width={800}
        height={400}
        priority
      />
    </section>
  );
}
```

---

_Refer to this guide whenever you add or update images in the project._ 