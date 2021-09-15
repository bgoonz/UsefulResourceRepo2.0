import json
import torch


def handler(event, context):
    # Request body is always stringified
    data = json.loads(event["body"])
    text = data["text"]

    # Stringify the response structure as well
    body = {"text": text}
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": True,
        },
        "body": json.dumps(body),
    }
