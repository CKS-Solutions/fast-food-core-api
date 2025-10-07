resource "kubernetes_config_map" "fast_food_config" {
  metadata {
    name      = "fast-food-config"
    namespace = "default"
  }

  data = {
    POSTGRES_HOST = data.aws_db_instance.fast_food_db.endpoint
    POSTGRES_PORT = "5432"
    POSTGRES_NAME = var.db_name
    MP_POS_ID = "totemvirtual01"
  }
}
