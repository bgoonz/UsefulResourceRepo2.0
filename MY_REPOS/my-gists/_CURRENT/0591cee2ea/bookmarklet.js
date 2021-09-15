javascript: if (
  "https://www.youtube.com/feed/channels" == window.location.href
) {
  let e = [...document.querySelectorAll("#main-link.channel-link")]
    .map((e) => {
      const [, t, n] = e.href.match("/((?:user)|(?:channel))/(.*)$");
      return (
        "https://www.youtube.com/feeds/videos.xml?" +
        ("user" === t ? "user=" : "channel_id=") +
        n
      );
    })
    .join("\n");
  e
    ? navigator.clipboard
        .writeText(e)
        .then(() =>
          alert(
            "A list of channel RSS feeds has been copied to the clipboard. \nPaste these into rssmix.com to generate a single RSS feed, or opml-gen.ovh to generate an OPML file."
          )
        )
        .catch(() => {
          console.log(e),
            alert(
              "A list of channel RSS feeds has logged to the console. (Unable to copy to clipboard) \nPaste these into rssmix.com to generate a single RSS feed, or opml-gen.ovh to generate an OPML file."
            );
        })
    : alert("Couldn't find any subscriptions");
} else alert('Please run at "https://www.youtube.com/feed/channels"');
