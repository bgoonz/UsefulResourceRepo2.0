export function ProfilePic({ src, size = 120 }) {
  return <img src={src} className="rounded-full" width={size} height={size} />;
}
