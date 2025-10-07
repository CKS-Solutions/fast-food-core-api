resource "kubernetes_deployment" "fast_food_api" {
  metadata {
    name      = "fast-food-api"
    namespace = "default"
    labels = {
      app = "fast-food"
    }
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "fast-food"
      }
    }

    template {
      metadata {
        labels = {
          app = "fast-food"
        }
      }

      spec {
        container {
          name  = "fast-food-api"
          image = "cauakath/fast-food-tc:latest"

          port {
            container_port = 3000
          }

          env_from {
            config_map_ref {
              name = kubernetes_config_map.fast_food_config.metadata[0].name
            }
          }

          env_from {
            secret_ref {
              name = kubernetes_secret.fast_food_secrets.metadata[0].name
            }
          }

          env {
            name  = "DATABASE_URL"
            value = local.database_url
          }

          resources {
            limits = {
              cpu    = "500m"
              memory = "512Mi"
            }
            requests = {
              cpu    = "200m"
              memory = "256Mi"
            }
          }
        }
      }
    }
  }
}
