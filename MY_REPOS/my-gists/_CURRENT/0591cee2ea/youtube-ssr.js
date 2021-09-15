if (window.location.href == "https://www.youtube.com/feed/channels") {
  let rssText = [...document.querySelectorAll("#main-link.channel-link")]
    .map((e) => {
      const [, a, b] = e.href.match("/((?:user)|(?:channel))/(.*)$");
      return (
        "https://www.youtube.com/feeds/videos.xml?" +
        (a === "user" ? "user=" : "channel_id=") +
        b
      );
    })
    .join("\n");
  if (rssText) {
    navigator.clipboard
      .writeText(rssText)
      .then(() =>
        alert(
          "A list of channel RSS feeds has been copied to the clipboard. \nPaste these into rssmix.com to generate a single RSS feed, or opml-gen.ovh to generate an OPML file."
        )
      )
      .catch(() => {
        console.log(rssText);
        alert(
          "A list of channel RSS feeds has logged to the console. (Unable to copy to clipboard) \nPaste these into rssmix.com to generate a single RSS feed, or opml-gen.ovh to generate an OPML file."
        );
      });
  } else {
    alert("Couldn't find any subscriptions");
  }
} else {
  alert('Please run at "https://www.youtube.com/feed/channels"');
}

/*
# YouTube Subscriptions to RSS feed
**To create an RSS feed of all your YouTube subscriptions:**
- Navigate to https://www.youtube.com/feed/channels, and scroll the page to make sure links to every channel are loaded.
- Run the script or activate the bookmarklet to copy a list of channel RSS feeds to your clipboard.
- Paste the copied list into [rssmix.com](http://rssmix.com/) to create a combined RSS feed of all channels, or into [opml-gen.ovh](https://opml-gen.ovh/) to create an OPML file.

*Works in Chrome, Firefox and Safari as of August 2021.*
*/
