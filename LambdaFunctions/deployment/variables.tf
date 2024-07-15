variable "group_name" {
  type     = string
  nullable = false
  default  = ""
}

variable "global_s3_name" {
  type     = string
  nullable = false
  default  = "seng3011-student"
}

variable "gateway_api_id" {
  type     = string
  nullable = false
  default  = "8ohk6nmtr5"
}

variable "gateway_auth_id" {
  type     = string
  nullable = false
  default  = ""
}

variable "vpc_id" {
  type     = string
  nullable = false
  default  = ""
}

variable "vpc_connection_id" {
  type     = string
  nullable = false
  default  = ""
}
