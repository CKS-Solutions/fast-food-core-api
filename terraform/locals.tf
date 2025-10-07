locals {
  database_url = "postgresql://${var.db_username}:${var.db_password}@${data.aws_db_instance.fast_food_db.address}:${data.aws_db_instance.fast_food_db.port}/${var.db_name}?schema=public"
}