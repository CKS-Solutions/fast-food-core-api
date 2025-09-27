#!/bin/bash

# Fast Food TC - Lambda Deployment Script
set -e

echo "🚀 Starting Lambda deployment for Fast Food TC..."

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

# Navigate to project root
cd "$PROJECT_ROOT"

echo "📦 Installing dependencies..."
npm install

echo "🏗️  Building application..."
npm run build

echo "🔧 Generating Prisma client..."
npx prisma generate --schema=src/adapters/driven/persistance/schema.prisma

echo "📁 Navigating to Terraform directory..."
cd "$TERRAFORM_DIR"

# Check if terraform.tfvars exists
if [ ! -f "terraform.tfvars" ]; then
    echo "⚠️  terraform.tfvars not found. Please copy terraform.tfvars.example and configure your values:"
    echo "   cp terraform.tfvars.example terraform.tfvars"
    echo "   # Edit terraform.tfvars with your configuration"
    exit 1
fi

echo "🔧 Initializing Terraform..."
terraform init

echo "📋 Planning Terraform deployment..."
terraform plan

echo "🚀 Applying Terraform configuration..."
read -p "Proceed with deployment? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    terraform apply
    
    echo ""
    echo "✅ Deployment completed successfully!"
    echo ""
    echo "📋 Deployment outputs:"
    terraform output
    
    echo ""
    echo "🌐 API Gateway URL:"
    terraform output -raw api_gateway_url
    
    echo ""
    echo "📝 Next steps:"
    echo "1. Run database migrations (see README.md)"
    echo "2. Test your API endpoints"
    echo "3. Check CloudWatch logs if needed"
else
    echo "❌ Deployment cancelled."
    exit 1
fi