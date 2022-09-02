export interface Gif {
  id: string;
  images: {
    original: {
      url: string;
    };
  };
  title: string;
  user: {
    avatar_url: string;
  };
}
