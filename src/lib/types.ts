// Enhanced image object from @sveltejs/enhanced-img
export interface EnhancedImage {
  img: {
    src: string;
    w: number;
    h: number;
  };
  sources: {
    avif?: string;
    webp?: string;
  };
}

export type ImageSource = EnhancedImage | string;

export interface Photo {
  id: number;
  src: ImageSource;
  title: string;
  location: string;
}
