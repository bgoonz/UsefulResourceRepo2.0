/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

 */

const spark = (ctx, data, opts) => {
  const len = data.length;
  const pad = 1;
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  const barWidth = width / len;
  const max = Math.max.apply(null, data);
  ctx.fillStyle = opts.barFill || 'rgba(0,0,255,0.5)';
  ctx.strokeStyle = opts.lineStroke || 'red';
  ctx.lineWidth = 1;

  data.forEach((n, i) => {
    const x = i * barWidth + pad;
    const y = height * (n / max);

    ctx.lineTo(x, height - y);
    ctx.fillRect(x, height, barWidth - pad, -y);
  })

  ctx.stroke();
};

module.exports = spark;
