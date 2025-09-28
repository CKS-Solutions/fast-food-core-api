# Terraform Infrastructure for AWS Lambda

This directory contains Terraform configuration for all infrastructure of the project.

## Prerequisites

1. **AWS CLI** configured with appropriate credentials
2. **Terraform** installed (version >= 1.0)

## Setup

1. **Configure aws profile**
   * Configure the aws profile using the `aws configure` command.
   * Appoint the profile to account-dev.
   * The profile must be named `dev-admin` (you can change it in envs/dev/backend.hcl and variables.tf)

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
