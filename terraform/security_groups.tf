# Security Group for Lambda function
resource "aws_security_group" "lambda" {
  name_prefix = "${var.project_name}-lambda-"
  vpc_id      = aws_vpc.main.id

  description = "Security group for Lambda function"

  # Outbound rules - Lambda needs to access RDS and internet
  egress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr]
    description = "PostgreSQL access to RDS"
  }

  egress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTPS outbound"
  }

  egress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTP outbound"
  }

  tags = {
    Name        = "${var.project_name}-lambda-sg"
    Environment = var.environment
  }
}

# Security Group for RDS PostgreSQL
resource "aws_security_group" "rds" {
  name_prefix = "${var.project_name}-rds-"
  vpc_id      = aws_vpc.main.id

  description = "Security group for RDS PostgreSQL database"

  # Inbound rule - Allow Lambda to connect to PostgreSQL
  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.lambda.id]
    description     = "PostgreSQL access from Lambda"
  }

  # Optional: Allow access from specific CIDR (for database administration)
  # Uncomment and modify as needed
  # ingress {
  #   from_port   = 5432
  #   to_port     = 5432
  #   protocol    = "tcp"
  #   cidr_blocks = ["YOUR_ADMIN_IP/32"]
  #   description = "PostgreSQL admin access"
  # }

  tags = {
    Name        = "${var.project_name}-rds-sg"
    Environment = var.environment
  }
}

# Security Group for API Gateway VPC Link (if needed for private API)
resource "aws_security_group" "api_gateway" {
  name_prefix = "${var.project_name}-api-gateway-"
  vpc_id      = aws_vpc.main.id

  description = "Security group for API Gateway VPC Link"

  # Inbound HTTP/HTTPS
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTP inbound"
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTPS inbound"
  }

  # Outbound to Lambda
  egress {
    from_port       = 80
    to_port         = 80
    protocol        = "tcp"
    security_groups = [aws_security_group.lambda.id]
    description     = "HTTP to Lambda"
  }

  egress {
    from_port       = 443
    to_port         = 443
    protocol        = "tcp"
    security_groups = [aws_security_group.lambda.id]
    description     = "HTTPS to Lambda"
  }

  tags = {
    Name        = "${var.project_name}-api-gateway-sg"
    Environment = var.environment
  }
}