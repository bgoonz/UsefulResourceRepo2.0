require './lib/chartable'

data = [{x: 0, y: 20}, { x: 1, y: 40 }, { x: 2, y: 50 }, { x: 3, y: 25 }]

File.open('index.html', 'w') do |f|
  f.write(<<-HTML
<!DOCTYPE html>
<link rel="stylesheet" href="https://unpkg.com/tachyons/css/tachyons.min.css">
<body>
<div class="bg-near-white">
  <div class="measure center">
    <h1 class="mv0 pt5 f1 f-subheadline-m f-subheadline-l">Chartable</h1>
    <h2 class="mid-gray pb5">A tiny ruby library for svg charts</h2>
  </div>
</div>
<div class="bb b--light-gray pv4">
  <div class="measure center">
    <p class="f3 lh-copy">
      Chartable is not intended to be feature rich or interactive, there are already libraries for that.
      Chartable is meant for a project where you only need a static chart or two and don't want to require a download of thousands of lines of JavaScript.
    </p>
    <p class="f3 lh-copy pb3">
      It's a ruby port of <a class="link dim black underline" href="https://github.com/jxnblk/chartable">chartable</a> by <a class="link dim black underline" href="https://twitter.com/jxnblk">@jxnblk</a>.
    </p>
    <p class="f3 lh-copy pb3">
      This is a work in progress.
    </p>
  </div>
</div>
<div class="pv4">
  <div class="measure center">
    <p class="f3 lh-copy">
      The bar chart takes an array of objects with x and y keys.
      For these examples lets assume the data looks like the following.
    </p>
    <pre class="pa3 bg-near-white">[
  { x: 0, y: 20 },
  { x: 1, y: 40 },
  { x: 2, y: 50 },
  { x: 3, y: 25 }
]</pre>
    <p class="f3 lh-copy">
      Rendering a bar chart requires calling <code>Chartable.bar</code> and passing in the data.
      It returns an svg string representation of the bar chart.
    </p>
    <pre class="pa3 bg-near-white">Chartable.bar(data, width: 300, height: 150)</pre>
    <div class="tc pa3">
      #{Chartable.bar(data)}
    </div>
    <h4>X Axis</h4>
    <p class="f3 lh-copy">
      You can specify an x axis with the <code>x_axis</code>.
      It's an inline styled border so you can give it a value like <code>'thin solid #ddd'</code>.
    </p>
    <pre class="pa3 bg-near-white">Chartable.bar(data, x_axis: 'thin solid #ddd')</pre>
    <div class="tc pa3">
      #{Chartable.bar(data, x_axis: 'thin solid #ddd')}
    </div>
    <h4>Y Axis</h4>
    <p class="f3 lh-copy">
      Similarly to the <code>x_axis</code> option, you can also specify a <code>y_axis</code>.
    </p>
    <pre class="pa3 bg-near-white">Chartable.bar(data, y_axis: 'thin solid #ddd')</pre>
    <div class="tc pa3">
      #{Chartable.bar(data, y_axis: 'thin solid #ddd')}
    </div>
  </div>
</div>
</body>
HTML
	)
end
