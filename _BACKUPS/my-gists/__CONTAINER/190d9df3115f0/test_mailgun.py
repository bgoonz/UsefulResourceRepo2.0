import mock

from sentry.testutils import TestCase
from sentry.utils.email import group_id_to_email

body_plain = "foo bar"


class TestProcessInboundMessage(TestCase):
    urls = 'getsentry.conf.urls.app'

    def setUp(self):
        super(TestProcessInboundMessage, self).setUp()
        self.event = self.create_event(event_id='a' * 32)
        self.mailto = group_id_to_email(self.group.pk)

    @mock.patch('getsentry.web.mailgun.process_inbound_email')
    def test_simple(self, process_inbound_email):
        resp = self.client.post('/api/0/mailgun/inbound/', {
            'To': 'Sentry <%s>' % (self.mailto,),
            'From': 'David <%s>' % (self.user.email,),
            'body-plain': body_plain,
        })
        assert resp.status_code == 201
        process_inbound_email.delay.assert_called_once_with(
            self.user.email,
            self.group.id,
            body_plain,
        )
