# Terraform Infrastructure for AWS Lambda

This directory contains Terraform configuration for deploying a simple AWS Lambda function with API Gateway.

## Prerequisites

1. **AWS CLI** configured with appropriate credentials
2. **Terraform** installed (version >= 1.0)
3. **S3 bucket** for remote state (update bucket name in `main.tf`)

## Setup

1. **Configure variables**:
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   # Edit terraform.tfvars with your configuration
   ```

2. **Update S3 backend configuration** in `main.tf`:
   ```hcl
   backend "s3" {
     bucket = "your-terraform-state-bucket"  # Change this
     key    = "lambda/terraform.tfstate"
     region = "us-east-1"
   }
   ```

3. **Initialize Terraform**:
   ```bash
   terraform init
   ```

4. **Plan and apply**:
   ```bash
   terraform plan
   terraform apply
   ```

## Resources Created

- **AWS Lambda Function**: Simple Node.js function with placeholder code
- **API Gateway**: REST API with proxy integration to Lambda
- **IAM Role**: Execution role for Lambda with basic permissions
- **CloudWatch Log Group**: For Lambda function logs

## Outputs

- `api_gateway_url`: The base URL for your API Gateway
- `lambda_function_name`: Name of the created Lambda function
- `lambda_function_arn`: ARN of the Lambda function

## Next Steps

After deployment, you can:
1. Update the Lambda function code through the AWS Console or AWS CLI
2. Test your API using the API Gateway URL
3. Monitor function execution through CloudWatch logs