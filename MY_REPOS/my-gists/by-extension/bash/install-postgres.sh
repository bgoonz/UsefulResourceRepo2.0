# Install postgres
sudo apt-get update
sudo apt-get -y install postgresql

sudo su - postgres
psql

for connection info : \conninfo
for password : \password

for roles : \du
for database : \l 
for relation : \d
for table : \dt