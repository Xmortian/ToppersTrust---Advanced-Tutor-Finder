// Model: ShortListModel
export const tutorProfileImageFallback = (name) =>
  `https://placehold.co/200x280/4A5568/E2E8F0?text=${
    name?.split(' ').map((n) => n[0]).join('') || 'T'
  }&font=roboto`;
