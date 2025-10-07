resource "kubernetes_secret" "fast_food_secrets" {
  metadata {
    name      = "fast-food-secrets"
    namespace = "default"
  }

  data = {
    POSTGRES_USER = var.db_username
    POSTGRES_PASSWORD = var.db_password
    MP_USER_ID = var.mp_user
    MP_CLIENT_ID = var.mp_client_id
    MP_CLIENT_SECRET = var.mp_client_secret
  }

  type = "Opaque"
}
