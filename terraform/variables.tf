variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "aws_profile" {
  type = string
  default = "dev-admin" # profile saved locally in aws cli
}

variable "expected_account_id" {
  type = string
  default = "351323458664" # account-dev
}
