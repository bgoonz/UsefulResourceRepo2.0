// Firewall - Open ports for SSH, CapRover, etc 
// here required ports for CapRover: https://caprover.com/docs/get-started.html
locals {
  tcp_ports = [22,80,443,3000,996,7946,4789,2377]
  udp_ports = [7946,4789,2377]
}

resource "null_resource" "open_firewall_ports" {
  provisioner "local-exec" {
    command = replace(chomp(<<-EOT
      aws lightsail put-instance-public-ports
      --instance-name ${var.caprover_server_name}
      --port-infos
      %{ for port in local.tcp_ports }
        fromPort=${port},toPort=${port},protocol=tcp
      %{ endfor }
      %{ for port in local.udp_ports }
        fromPort=${port},toPort=${port},protocol=udp
      %{ endfor }
        EOT
      ),"\n"," ")
  }
}

// Ssh - Download default Public SSH key
resource "null_resource" "download_ssh_key" {
  provisioner "local-exec" {
    // deletes file first
    command = <<-EOT
      rm aws.pem ;
      aws lightsail download-default-key-pair --output text --query \"privateKeyBase64\" > aws.pem ;
      chmod 600 aws.pem
      EOT
  }

  depends_on = [null_resource.open_firewall_ports]
}

// Install CapRover
// https://caprover.com/docs/get-started.html
resource "null_resource" "install_caprover" {
  connection {
    type  = "ssh"
    host  = var.caprover_server_ip_address
    user  = "ubuntu"
    port  = 22
    agent = true
    private_key = file("aws.pem")
  }

  // Install and start docker
  provisioner "remote-exec" {
    inline = [
      "sudo apt-get update",//update repos
      "sudo apt install docker.io -y || true",// true flag is to ignore error if already installed
      "sudo systemctl start docker",// start docker daemon
      "sudo systemctl enable docker",// configure docker to start on boot
      "sudo usermod -aG docker ubuntu",//add user to docker group
    ]
  }

  // IMPORTANT
  // We need 2 distinct remote-exec blocks to force SSH connection to be disconnected
  // and reconnected, forcing 'docker' group assignments to reload!
  provisioner "remote-exec" {
    inline = [
      "docker container kill $(docker ps -q)",//kill all running docker containers
      "docker run -p 80:80 -p 443:443 -p 3000:3000 -v /var/run/docker.sock:/var/run/docker.sock -v /captain:/captain caprover/caprover",
    ]
  }

  depends_on = [null_resource.download_ssh_key]
}

resource "random_password" "caprover_password" {
  length           = 16
  special          = false
}

// Create CapRover Config.Json
resource "local_file" "caprover_create_json" {
    content  = jsonencode({
      "caproverIP": var.caprover_server_ip_address,
      "caproverPassword": "captain42",
      "caproverRootDomain": var.caprover_domain,
      "newPassword": random_password.caprover_password.result,
      "certificateEmail": var.caprover_email,
      "caproverName": "lcn_caprover",
    })
    filename = "caprover.json"
}

resource "null_resource" "caprover_configure" {
  provisioner "local-exec" {
    //we have to wait 60ecs until caprover starts
    //install CapRover CLI
    command = replace(chomp(<<-EOT
      sleep 60;
      npm install -g caprover;
      caprover logout -n lcn_caprover;
      caprover serversetup -c ./caprover.json
        EOT
      ),"\n"," ")
  }

  depends_on = [null_resource.install_caprover]
}