terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

data "aws_caller_identity" "me" {}

resource "null_resource" "assert_account" {
  lifecycle {
    precondition {
      condition     = data.aws_caller_identity.me.account_id == var.expected_account_id
      error_message = "AWS account incorreta. Esperado ${var.expected_account_id}, atual ${data.aws_caller_identity.me.account_id}."
    }
  }
}
