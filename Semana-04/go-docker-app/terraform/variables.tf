variable "token" {
    type        = string
    description = "DigitalOcean API Token"
    default     = "dop_v1_6321a71810d6fa45eb01c7724fe8d6f1c5109057fec7c53be34af43a743ca061"
}

variable "ssh_fingerprint" {
    type        = string
    description = "Public Key"
    default     = "8c:d7:eb:fc:4c:be:46:c7:a0:04:18:90:18:a3:f0:0c"
}

variable "public_key" {
    type = string
    description = "Public Key"
    default = "C:\\Users\\elbac\\.ssh\\id_rsa.pub"
}
variable "private_key" {
    type = string
    description = "Private Key"
    default =  "C:\\Users\\elbac\\.ssh\\id_rsa"
}