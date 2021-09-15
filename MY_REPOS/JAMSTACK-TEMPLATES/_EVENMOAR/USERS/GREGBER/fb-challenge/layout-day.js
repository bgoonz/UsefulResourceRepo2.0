(function (undefined) {
  // Expose method on global scope.
  window.layOutDay = layOutDay;

  // Event template.
  var eventTemplate = $('#event-template').html();

  // Calendar.
  var calendar = $('.calendar');

  // Maximum width to display events.
  var maxWidth = 600;

  /**
   * Lay out the events on the calendar.
   *
   * @param {object[]} events
   */

  function layOutDay(events) {
    // Clean the calendar.
    clean();

    // Do nothing if it's not a valid array.
    if (!Array.isArray(events)) return;

    // Remove invalid events.
    events = events.filter(function isValid(event) {
      return event.start !== undefined &&
        event.end !== undefined &&
        event.end > event.start;
    });

    // Sort events by range to optimize positioning.
    events.sort(function byRange(a, b) {
      return (b.end - b.start) - (a.end - a.start);
    });

    // Compute dimension and position of events.
    events.forEach(function computeDimensionAndPosition(event) {
      // Add dimension and neighbours.
      event.dimension = 0;
      event.neighbours = getNeighbours(event);

      // Compute position of the event.
      event.position = event.neighbours.reduce(function (position, neigbour) {
        if (neigbour.position === position) position++;
        return position;
      }, 0);

      // Adjust dimension according to position.
      if (event.position >= event.dimension)
        event.dimension = event.position + 1;
    });

    // Sort by dimension to optimize dimension propagation.
    events.sort(function byDimension(a, b) {
      return b.dimension - a.dimension;
    });

    // Propagate event dimension to neighbours.
    events.forEach(function propagateDimension(event) {
      event.neighbours.forEach(function (neigbour) {
        if (neigbour.dimension < event.dimension) {
          neigbour.dimension = event.dimension;
        }
      });
    });

    // Add element to the calendar.
    events.forEach(function addElement(event) {
      // Compute size and positionning.
      var width = maxWidth * (1 / event.dimension) - 22;
      var height = event.end - event.start - 10;
      var top = event.start;
      var left = maxWidth * (event.position / event.dimension);

      // Create element.
      var element = $(eventTemplate);
      element.css('top', top);
      element.css('height', height);
      element.css('width', width);
      element.css('margin-left', left);

      // Add element on the calendar.
      calendar.append(element);
    });


    /**
     * Return neighbours of an event.
     * Neigbours are events that interesects.
     *
     * @param {object} event
     */

    function getNeighbours(event) {
      return events.filter(function (ev) {
        return intersects(ev, event);
      })
      .sort(function (a, b) {
        return (a.position || 0) - (b.position || 0);
      });
    }

    /**
     * Test if two events intersects.
     *
     * @param {object} eventA
     * @param {object} eventB
     */

    function intersects(eventA, eventB) {
      return !((eventA.end < eventB.start) || (eventB.end < eventA.start));
    }

    /**
     * Clean the calendar by removing all elements.
     */

    function clean() {
      calendar.empty();
    }
  }
}());
