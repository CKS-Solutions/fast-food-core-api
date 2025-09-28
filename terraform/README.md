# Terraform Infrastructure for AWS Lambda

This directory contains Terraform configuration for all infrastructure of the project.

## Prerequisites

1. **AWS CLI** configured with appropriate credentials
2. **Terraform** installed (version >= 1.0)

## Setup

1. **Configure aws profile**
   * Configure the aws profile using the `aws configure` command.
   * Appoint the profile to account-dev.
   * The profile must be named `dev-admin`.

2. **Login in AWS**
   login in AWS using the `aws login` command.

3. **Initialize Terraform**:
   ```bash
   terraform init -reconfigure -backend-config="envs/dev/backend.hcl"
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