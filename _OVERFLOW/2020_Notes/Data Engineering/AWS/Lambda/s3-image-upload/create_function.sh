#!/bin/bash

aws lambda create-function --function-name ResizeImage \
	--zip-file fileb://lambda.zip --handler index --runtime python3.6 \
	--timeout 10 --memory-size 1024 \
	--role arn:aws:iam::345924873717:role/Lambda-Role
