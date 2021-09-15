(function($) {
  $.fn.clockify = function(options) {
    var defaultsOptions = {
      r: 20,
      strokeWidth: 4,
      color: '#000',
      lineJoin: 'round',
      lineCap: 'round'
    };
    
    options = $.extend(defaultsOptions, options);
    
    var getTimeFromDate,
    createSvg,
    date,
    hm = [];
    
    createSvg = function(hm) {
      var svg,
      circle,
      poly,
      hWidth = Math.round(options.r * 0.4),
      mWidth = Math.round(options.r * 0.7),
      center = Math.round(options.r + options.strokeWidth / 2),
      hx = center + Math.cos((1 + (hm[0] + 3) / 6) * Math.PI) * hWidth,
      hy = center + Math.sin((1 + (hm[0] + 3) / 6) * Math.PI) * hWidth,
      mx = center + Math.cos((1 + (hm[1] + 15) / 30) * Math.PI) * mWidth,
      my = center + Math.sin((1 + (hm[1] + 15) / 30) * Math.PI) * mWidth,
      points = [
        [hx, hy],
        [center, center],
        [mx, my],
      ],
      pointsStr = '';
      
      for(var i = 0, il = points.length; i < il; i++) {
        pointsStr += points[i].join(',') + ' ';
      }
      
      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('version', '1.2');
      svg.setAttribute('baseProfile', 'tiny');
      
      circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', center);
      circle.setAttribute('cy', center);
      circle.setAttribute('r', options.r);
      circle.setAttribute('fill-opacity', '0');
      circle.setAttribute('stroke', options.color);
      circle.setAttribute('stroke-width', options.strokeWidth);
      svg.appendChild(circle);
      
      poly = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
      poly.setAttribute('points', pointsStr);
      poly.setAttribute('stroke', options.color);
      poly.setAttribute('stroke-width', options.strokeWidth);
      poly.setAttribute('stroke-linejoin', options.lineJoin);
      poly.setAttribute('stroke-linecap', options.lineCap);
      poly.setAttribute('fill-opacity', '0');
      svg.appendChild(poly);
      
      return svg;
    };
    
    getTimeFromDate = function (date) {
      return [date.getHours(), date.getMinutes()];
    };
    
    if(typeof options.datetime !== 'undefined') {
      date = new Date(options.datetime);
      hm = getTimeFromDate(date);
    }
    else if(typeof options.time !== 'undefined') {
      hm = options.time.split(':');
    }
    
    this.each(function() {
      var $this = $(this),
      svg,
      isoTime;
      
      if(typeof date === 'undefined') {
        if(typeof $this.attr('datetime') !== 'undefined') {
          date = new Date($this.attr('datetime'));
          hm = getTimeFromDate(date);
        }
        else if(typeof $this.data('time') !== 'undefined') {
          hm = $this.data('time').split(':');
        }
        else if(typeof $this.data('date') !== 'undefined') {
          hm = getTimeFromDate(new Date($this.data('date')));
        }
      }

      if(!hm.length) {
        throw new Error("undefined date");
      }
      
      svg = createSvg(hm);

      isoTime = new Date();
      isoTime.setHours(hm[0]);
      isoTime.setMinutes(hm[1]);
      
      $this.data('clockify-time', isoTime.toJSON());
      $this.append(svg);
      
    });
  };
}(window.jQuery));