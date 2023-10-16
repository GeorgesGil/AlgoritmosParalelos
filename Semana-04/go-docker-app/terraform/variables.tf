variable "token" {
    type        = string
    description = "DigitalOcean API Token"
<<<<<<< HEAD
    default     = "dop_v1_dd12bf374065813c19cacce9b0cc87d97e4030ce976024ec0c9d907020fb5c17"
=======
    default     = "dop_v1_ca7a457ce13c9af858755951b23d48df62f680036214ab2ddb6439949beb732a"
>>>>>>> 4b59c4315e807582a0f8bc79dac7c2a522290cd9
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