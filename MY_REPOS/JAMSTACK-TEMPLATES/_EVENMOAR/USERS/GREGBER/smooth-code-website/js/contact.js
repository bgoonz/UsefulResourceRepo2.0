(function () {
  $('form[name=contactForm]').on('submit', function () {
    var form = $(this);
    var button = form.find('[type=submit]');

    button
      .attr('disabled', 'disabled')
      .html('Envoi en cours...');

    $.post('/api/contact', form.serialize())
      .then(function () {
        form.siblings('.alert-success').show();
        form.siblings('.alert-danger').hide();
        form.hide();
      }, function () {
        form.siblings('.alert-success').hide();
        form.siblings('.alert-danger').show();
      })
      .always(function () {
        button
          .removeAttr('disabled')
          .html('Envoyer');
      });

    return false;
  });
}());
