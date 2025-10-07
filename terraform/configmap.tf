resource "kubernetes_config_map" "fast_food_config" {
  metadata {
    name      = "fast-food-config"
    namespace = "default"
  }

  data = {
    POSTGRES_HOST = "postgres"
    POSTGRES_PORT = "5432"
    POSTGRES_NAME = "mydb"
    MP_POS_ID = "totemvirtual01"
  }
}
