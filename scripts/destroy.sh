#!/bin/bash

# Fast Food TC - Infrastructure Destruction Script
set -e

echo "🗑️  Starting infrastructure destruction for Fast Food TC..."

# Check if required tools are installed
if ! command -v terraform &> /dev/null; then
    echo "❌ Terraform is not installed. Please install Terraform first."
    exit 1
fi

if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install AWS CLI first."
    exit 1
fi

# Check AWS credentials
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials not configured. Please run 'aws configure' first."
    exit 1
fi

# Get the project root directory
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TERRAFORM_DIR="$PROJECT_ROOT/terraform"

echo "📁 Navigating to Terraform directory..."
cd "$TERRAFORM_DIR"

# Check if terraform.tfvars exists
if [ ! -f "terraform.tfvars" ]; then
    echo "⚠️  terraform.tfvars not found. Infrastructure may not be deployed."
    exit 1
fi

echo "📋 Planning infrastructure destruction..."
terraform plan -destroy

echo ""
echo "⚠️  WARNING: This will destroy ALL infrastructure resources!"
echo "   - Lambda function"
echo "   - API Gateway"
echo "   - RDS PostgreSQL database (with all data)"
echo "   - VPC and networking components"
echo "   - CloudWatch logs"
echo ""

read -p "Are you sure you want to destroy all resources? (type 'yes' to confirm): " -r
echo
if [[ $REPLY == "yes" ]]; then
    echo "🗑️  Destroying infrastructure..."
    terraform destroy
    
    echo ""
    echo "✅ Infrastructure destroyed successfully!"
    echo ""
    echo "🧹 Cleaning up local files..."
    rm -f lambda-function.zip
    
    echo "✅ Cleanup completed!"
else
    echo "❌ Destruction cancelled."
    exit 1
fi