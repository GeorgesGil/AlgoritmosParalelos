variable "token" {
    type        = string
    description = "DigitalOcean API Token"
    default     = "dop_v1_4a70acf4adfeb4ec64edadc032ef7d80f289d7e0fecd12a971c72f54a9429e1d"
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