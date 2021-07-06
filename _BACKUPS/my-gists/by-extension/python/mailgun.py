import logging

from django.http import HttpResponse
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from email_reply_parser import EmailReplyParser
from email.utils import parseaddr

from sentry.tasks.email import process_inbound_email
from sentry.utils.email import email_to_group_id


@never_cache
@csrf_exempt
@require_http_methods(['POST'])
def process_inbound_message(request):
    to_email = parseaddr(request.POST['To'])[1]
    from_email = parseaddr(request.POST['From'])[1]

    try:
        group_id = email_to_group_id(to_email)
    except Exception:
        logging.info('%r is not a valid email address', to_email)
        return HttpResponse(status=500)

    payload = EmailReplyParser.parse_reply(request.POST['body-plain']).strip()
    if not payload:
        # If there's no body, we don't need to go any further
        return HttpResponse(status=200)

    process_inbound_email.delay(from_email, group_id, payload)

    return HttpResponse(status=201)
