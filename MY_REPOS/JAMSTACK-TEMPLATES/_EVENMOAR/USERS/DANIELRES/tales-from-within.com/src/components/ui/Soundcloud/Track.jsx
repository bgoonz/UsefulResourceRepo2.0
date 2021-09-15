export function Track({
  id,
  track = "reefs",
  artist = "tales-from-within",
  color = "7777aa",
  inverse = true,
  autoPlay = false,
  showUser = false,
  size = 1,
}) {
  const url = `https://soundcloud.com/${artist}/${track}`;

  const sizes = [19.5, 130];

  return (
    <iframe
      className="opacity-80 hover:opacity-100 transition transition-opacity"
      width="100%"
      height={sizes[size - 1]}
      scrolling="no"
      frameborder="no"
      allow="autoplay"
      src={`https://w.soundcloud.com/player/?url=${url}&color=%23${color}&inverse=${inverse}&auto_play=${autoPlay}&show_user=${showUser}`}
    ></iframe>
  );
}
