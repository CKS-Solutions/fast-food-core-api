variable "aws_region" {
  type        = string
  description = "Região da AWS onde o EKS está rodando"
  default     = "us-east-1"
}

variable "eks_cluster_name" {
  type        = string
  description = "Nome do cluster EKS existente"
  default     = "fast-food-eks"
}

# Variáveis sensíveis (usadas no secrets)
variable "db_username" {
  type        = string
  description = "Usuário do banco"
  sensitive   = true
}

variable "db_password" {
  type        = string
  description = "Senha do banco"
  sensitive   = true
}

variable "db_name" {
  type        = string
  description = "Nome do banco"
  default     = "appdb"
}

variable "mp_user" {
  type        = string
  description = "ID do usuário do Mercado Pago"
  sensitive   = true
}

variable "mp_client_id" {
  type        = string
  description = "ID do cliente do Mercado Pago"
  sensitive   = true
}

variable "mp_client_secret" {
  type        = string
  description = "Segredo do cliente do Mercado Pago"
  sensitive   = true
}
