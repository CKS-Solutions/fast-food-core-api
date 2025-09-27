# Lambda Deployment Guide

This guide explains how to deploy the Fast Food TC application to AWS Lambda using Terraform.

## Overview

The Terraform configuration creates the following AWS resources:

- **Lambda Function**: Runs the NestJS application
- **API Gateway**: Provides HTTP endpoints for the Lambda function
- **RDS PostgreSQL**: Database for the application
- **VPC**: Isolated network environment
- **Security Groups**: Network security rules
- **CloudWatch**: Logging and monitoring

## Architecture

```
Internet → API Gateway → Lambda Function → RDS PostgreSQL
                     ↓
               CloudWatch Logs
```

The Lambda function is deployed in private subnets within a VPC, ensuring secure database access.

## Prerequisites

1. **AWS CLI**: Install and configure with appropriate credentials
2. **Terraform**: Version 1.0 or higher
3. **Node.js**: Version 20 or higher
4. **npm**: For dependency management

## Quick Start

1. **Clone and setup the project**:
   ```bash
   git clone <repository-url>
   cd fast-food-tc
   npm install
   ```

2. **Configure Terraform variables**:
   ```bash
   cd terraform
   cp terraform.tfvars.example terraform.tfvars
   # Edit terraform.tfvars with your configuration
   ```

3. **Deploy using the script**:
   ```bash
   ../scripts/deploy.sh
   ```

## Manual Deployment

If you prefer manual deployment:

1. **Build the application**:
   ```bash
   npm run build
   npx prisma generate --schema=src/adapters/driven/persistance/schema.prisma
   ```

2. **Initialize and apply Terraform**:
   ```bash
   cd terraform
   terraform init
   terraform plan
   terraform apply
   ```

## Configuration

### Required Variables

Edit `terraform/terraform.tfvars`:

```hcl
# Project Configuration
project_name = "fast-food-tc"
environment  = "dev"

# AWS Configuration
aws_region = "us-east-1"

# Database Configuration (CHANGE THE PASSWORD!)
db_password = "your-secure-password-here"
```

### Important Security Notes

- **Change the default database password** in `terraform.tfvars`
- **Use AWS Secrets Manager** for production deployments
- **Enable deletion protection** for production RDS instances
- **Configure proper backup policies** for production

## Database Setup

After deployment, run database migrations:

1. **Get the database endpoint** from Terraform outputs:
   ```bash
   cd terraform
   terraform output database_endpoint
   ```

2. **Update your local environment**:
   ```bash
   # In your .env file
   DATABASE_URL="postgresql://dbuser:your-password@<endpoint>:5432/fastfooddb"
   ```

3. **Run migrations**:
   ```bash
   npx prisma migrate deploy --schema=src/adapters/driven/persistance/schema.prisma
   ```

## Testing the Deployment

1. **Get the API Gateway URL**:
   ```bash
   cd terraform
   terraform output api_gateway_url
   ```

2. **Test the API**:
   ```bash
   curl <api-gateway-url>/
   curl <api-gateway-url>/products
   ```

3. **Check the Swagger documentation**:
   ```
   <api-gateway-url>/api
   ```

## Monitoring and Logs

- **Lambda Logs**: `/aws/lambda/fast-food-tc-api` in CloudWatch
- **API Gateway Logs**: `/aws/apigateway/fast-food-tc-api` in CloudWatch
- **RDS Monitoring**: Available in RDS console with Performance Insights enabled

## Cost Optimization

The configuration is optimized for cost:

- **Lambda**: Pay per invocation
- **RDS**: t4g.micro instance with burstable performance
- **API Gateway**: Pay per request
- **Storage**: GP3 with automatic scaling

Estimated monthly cost for low traffic: $15-30 USD

## Troubleshooting

### Common Issues

1. **Timeout errors**: Increase Lambda timeout in `main.tf`
2. **Database connection issues**: Check security groups and VPC configuration
3. **Build failures**: Ensure all dependencies are installed

### Debug Commands

```bash
# Check Lambda logs
aws logs tail /aws/lambda/fast-food-tc-api --follow

# Check RDS connectivity
aws rds describe-db-instances --db-instance-identifier fast-food-tc-postgres

# Test Lambda function directly
aws lambda invoke --function-name fast-food-tc-api output.json
```

## Cleanup

To destroy all resources:

```bash
./scripts/destroy.sh
```

Or manually:

```bash
cd terraform
terraform destroy
```

**⚠️ Warning**: This will permanently delete all data including the database!

## Production Considerations

For production deployments:

1. **Use AWS Secrets Manager** for database credentials
2. **Enable RDS deletion protection**
3. **Configure automated backups**
4. **Set up CloudWatch alarms**
5. **Use a custom domain** with API Gateway
6. **Implement proper error handling** and retry logic
7. **Consider using Lambda provisioned concurrency** for consistent performance

## Support

For issues related to:
- **Terraform configuration**: Check the Terraform documentation
- **AWS services**: Check AWS documentation
- **Application code**: Check the main README.md