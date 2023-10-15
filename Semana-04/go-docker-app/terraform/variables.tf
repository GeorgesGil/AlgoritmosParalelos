variable "token" {
    type        = string
    description = "DigitalOcean API Token"
    default     = "dop_v1_b749105f455815ba4deef709e7d8dba8736180257f7bd882c63eef0bdd2ea907"
}

variable "ssh_fingerprint" {
    type        = string
    description = "Public Key"
    default     = "c2:aa:fb:5a:cc:10:26:db:1f:ea:f2:5e:e1:73:30:80"
}

variable "private_key" {
    type        = string
    description = "Private Key"
    default     = file("${path.module}/putty/private.ppk")
}

variable "DB_USER" {
    type        = string
    description = "Database User"
    default     = "georgesgil"
}

variable "DB_PASSWORD" {
    type        = string
    description = "Database Password"
    default     = "1182363"
}

variable "DB_NAME" {
    type        = string
    description = "Database Name"
    default     = "georgesgil"
}
