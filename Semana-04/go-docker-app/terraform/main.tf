terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
    }
  }
}

provider "digitalocean" {
    token = "${ var.token }"
}
resource "digitalocean_droplet" "web" {
  image  = "docker-20-04"
  name   = "server"
  region = "nyc3"
  size   = "s-1vcpu-1gb" 
  ssh_keys = [
    var.ssh_fingerprint
  ]

   connection {
    host = self.ipv4_address
    user = "root" 
    type = "ssh"
    private_key = file(var.private_key)
    timeout = "2m"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo apt-get update",
      "sudo apt install git",

      "git clone https://github.com/wilbersx001/Servidor-Terraform.git",
      "cd Servidor-Terraform",
      "curl -L \"https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)\" -o /usr/local/bin/docker-compose",
      "chmod +x /usr/local/bin/docker-compose",
      "docker-compose --version",
      "docker-compose up -d --build",
      "docker-container ls",
      "sudo apt-get install -y mysql-client",
      "sudo ufw allow 1339",
      "sudo ufw allow 5432",
      "sudo ufw allow 8000"
    ]
    
    
  } 

  


}