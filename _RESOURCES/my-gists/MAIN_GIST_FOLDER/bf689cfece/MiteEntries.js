// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: stopwatch;

// mite.yo.lk API key
let apikey = '';
let account = '';

// ---
async function loadEntries() {
  let req = new Request(
    `https://${account}.mite.yo.lk/time_entries.json?user_id=current&at=today`
  );

  req.headers = {
    'X-MiteApiKey': apikey,
    'User-Agent': 'Scriptable widget (fp@ylk.gd)',
  };

  let res = await req.loadJSON();

  return res.map((i) => i.time_entry);
}

function renderWidget() {
  let w = new ListWidget();

  w.useDefaultPadding();
  w.url = `https://${account}.mite.yo.lk`;

  let gradient = new LinearGradient();
  gradient.colors = [new Color('#fff', 1), new Color('efefef', 1)];
  gradient.locations = [0, 1];

  w.backgroundGradient = gradient;

  let logoStr =
    'iVBORw0KGgoAAAANSUhEUgAAAGgAAAAgCAYAAAD+Fz2gAAAE0UlEQVR4Ae3ZA4wkWxSH8ebatm3bz7Zt27Zt27Ztc21rbM+c9yWpSU5uqnpuI28H9SW/5TT/7Q404A7FRvyNLvCrZV0JQT56wK+W9SQEmegOv1pUED/6A9XeeiPfH6j2dibEH6h21grL/YFqZ2E8DTEG6opaWwRRRFxEEYZZfxyBa3AbLsH2aIRY9cFh6nBX41D0hU0h87waogjBrDlm4UOIIRO9ELa87GatMQMn4mrchhtxFnZEByTV5/gLf7r4C8+huo54CLkQFz9gOsy64iFkQVxk4W40R6yONs6r6S/s4jLqaxAPFfgXf7gc1zXwqg9uwwpIDOtwJ3ogoSogMfwLCvTFfIijAPkQQw5mo7rxWAZxlCHH43TfQAReXQOpwRHQhbEUkoA34Nah2OIyxHt4Dm9hFURZjTmIuwNxFA7H8fgdonyHNvgTgi9wAAZjIPbDTxBlKSIYjM0QrMYFGI/emIqbUAJRDoVXI3AcjsAhuNHi8EHsjmNwBI7EeogjH2fgMByhHItpMDseVca9/zS0h641TkQmxJGNiUiqeagyBnoKgssRhlkrfA9RLlLDvYsucOsw4970FYKw7S3LgXV/QRwZaAWbJqPYGGcKYjXdeEqYj+ZIuGEohThKILjOYthKCET9+Rs0Q6y+NR4iu8O2u+McKIx/E3iZHcaXEOVk2HQxRDkz2YFKIMpPCCNWzbEWouRiCGrqVogyG7bd8z8NNAOiLENT2NQRaca9qDESarjLQHvDpp8hyiOw6XqIclAtHOgOiHIf4ultiKMK01I10Aa0gU3fQpRdYNMNEOWEWjZQ0OU59mjE0zUQ5YJUDfQbbPsO4ijFiAQHOq2WDdQGmxK48elOhygvpmqgXxMcqKQeDdQfBRBlCX7GLxZ+xmqI8nPqBvIHGo1SSAptQYvUDOQPNMZloJtxKI5IwJE4AI1TM5A/0EAUQpS52Bb5AzntjG9wP9phi3k623Ygf6DjIZiPIH5OwcvkFhjhaOcPlNxAR0LwIyhwP0R5DvF2IYpRiu39gZIb6AQIPlUPeaKsRnPYFsV8CLaiXao+LP05iYGGwabrIMqpSXxYepDFQPMtBroNgudBgcb4E6IcCdtOsfmYSK7tOB4HYGDAoynG1w0LYdti45vK8QleydfCthcT+IT5B4ijCAOha4SFLs81u7jci/pafoWTC0EW+nuMczFKIcjCvgGahBmYhh3wIUSpwLWYhZkYabw/mIlZuAEVEOV97IDpmKY+/e2LWZiOw7EJoqzFQZiOGZiMILqrw83ACciBKAuxF6ZhhqOl+70DwLkeD7nlGFHDZ2qLsSOCMGuHc4xvno/zGKcPiiDKogBlQOLwHar7FWKpUn31cBckDhmI4gJIAqZANwjZEEcxnsKV+BTiuB9uXYoyiPITHsBVuBEvYy1EjX1OjIe2yRBDWoDmYws2YxM2uNiIzdiKN1HdB9iKzdjocdhN2IK16q59FdJqOM1N2IwtmI8oTlanF/M0jZ8ZB7PdsDHGjekRNIVXU/Aa8iAxlOFDzIRnjNEKiyDK6wHqiM7oZKEL2uq7sM1h1c+EEaCW6IJOloftiAA1Mw5ne/go3OqKU/E0XsPzuByTYVt/HI6b8Txew8u4D6dgFKxikLH4EEvwPLr9B7LLrJGSR87jAAAAAElFTkSuQmCC';

  let logoImage = w.addImage(Image.fromData(Data.fromBase64String(logoStr)));
  logoImage.resizable = true;
  logoImage.imageSize = new Size(52, 16);
  logoImage.leftAlignImage();

  w.addSpacer(8);

  return w;
}

let blue = new Color('#2592e1');
let orange = new Color('#ff8215');
let black = new Color('#1d1d1d');
let gray = new Color('#999');

function renderEntry(
  w,
  {
    customer_name: customer,
    project_name: project,
    service_name: service,
    minutes,
  }
) {
  let s = w.addStack();

  let customerText = s.addText(customer);
  customerText.font = Font.boldSystemFont(13);
  customerText.textColor = blue;
  customerText.minimumScaleFactor = 1;

  s.addSpacer(4);

  let timeText = s.addText(`${Math.round(minutes / 60)}h`);
  timeText.font = Font.semiboldSystemFont(13);
  timeText.textColor = orange;
  timeText.minimumScaleFactor = 1;

  s.addSpacer(null);

  let s2 = w.addStack();

  let projectText = s2.addText(project);
  projectText.font = Font.boldSystemFont(11);
  projectText.textColor = black;
  projectText.minimumScaleFactor = 1;
  projectText.lineLimit = 1;

  s2.addSpacer(4);

  let serviceText = s2.addText(service);
  serviceText.font = Font.mediumSystemFont(11);
  serviceText.textColor = gray;
  serviceText.minimumScaleFactor = 1;
  serviceText.lineLimit = 1;

  s2.addSpacer(null);
  w.addSpacer(8);
}

function renderEntries(w, entries) {
  entries.forEach((entry) => renderEntry(w, entry));

  if (!entries || entries.length == 0) {
    let noText = w.addText('No time tracked yet');
    noText.font = Font.boldSystemFont(14);
    noText.textColor = orange;
  }

  w.addSpacer(null);
}

let widget = renderWidget();
let entries = await loadEntries();

renderEntries(widget, entries);

// Demo widget in app for development
if (config.runsInApp) {
  widget.presentSmall();
}

Script.setWidget(widget);
Script.complete();