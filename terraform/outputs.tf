output "api_gateway_url" {
  description = "Base URL for API Gateway stage"
  value       = aws_api_gateway_stage.api.invoke_url
}

output "api_gateway_id" {
  description = "ID of the API Gateway"
  value       = aws_api_gateway_rest_api.api.id
}

output "lambda_function_name" {
  description = "Name of the Lambda function"
  value       = aws_lambda_function.fast_food_api.function_name
}

output "lambda_function_arn" {
  description = "ARN of the Lambda function"
  value       = aws_lambda_function.fast_food_api.arn
}

output "database_endpoint" {
  description = "RDS instance endpoint"
  value       = aws_db_instance.postgres.endpoint
  sensitive   = true
}

output "database_port" {
  description = "RDS instance port"
  value       = aws_db_instance.postgres.port
}

output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.main.id
}

output "public_subnet_ids" {
  description = "IDs of the public subnets"
  value       = aws_subnet.public[*].id
}

output "private_subnet_ids" {
  description = "IDs of the private subnets"
  value       = aws_subnet.private[*].id
}

output "cloudwatch_log_group_lambda" {
  description = "CloudWatch Log Group name for Lambda"
  value       = aws_cloudwatch_log_group.lambda_logs.name
}

output "cloudwatch_log_group_api_gateway" {
  description = "CloudWatch Log Group name for API Gateway"
  value       = aws_cloudwatch_log_group.api_gateway.name
}