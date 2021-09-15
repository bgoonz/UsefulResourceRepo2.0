#!/bin/bash

INSTANCE_ID=
SSH_KEY=

echo "Starting AWS Server."
aws ec2 start-instances --instance-ids $INSTANCE_ID

echo "Checking Server Status..."
STARTED=False
while [ "$STARTED" != "True" ]; do
	STATUS=$(aws ec2 describe-instance-status --include-all-instances --instance-ids $INSTANCE_ID --output text --query 'InstanceStatuses[].InstanceState.Name')
	if [ "$STATUS" == "running" ]; then
		STARTED=True
	else
		sleep 3
		fi
	echo "Status: $STATUS"
	done

echo "Attempting to log into server."
#The Public DNS can change when the sever is shutdown, this queries the current DNS
PUBLIC_DNS=$(aws ec2 describe-instances --instance-ids $INSTANCE_ID --output text --query 'Reservations[].Instances[].PublicDnsName')
ssh -L localhost:8888:localhost:8888 -i $SSH_KEY ubuntu@$PUBLIC_DNS

echo "Shutting down server."
aws ec2 stop-instances --instance-ids $INSTANCE_ID
echo "Sent shutdown command."

sleep 1

echo "Querying instance status..."
aws ec2 describe-instance-status --include-all-instances --instance-ids $INSTANCE_ID --output text --query 'InstanceStatuses[]'

sleep 5
