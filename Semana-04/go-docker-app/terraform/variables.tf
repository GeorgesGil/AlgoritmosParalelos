variable "token" {
    type        = string
    description = "DigitalOcean API Token"
    default     = "dop_v1_ca7a457ce13c9af858755951b23d48df62f680036214ab2ddb6439949beb732a"
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