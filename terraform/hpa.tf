resource "kubernetes_horizontal_pod_autoscaler_v2" "fast_food_hpa" {
  metadata {
    name      = "fast-food-hpa"
    namespace = "default"
  }

  spec {
    scale_target_ref {
      api_version = "apps/v1"
      kind        = "Deployment"
      name        = kubernetes_deployment.fast_food_api.metadata[0].name
    }

    min_replicas = 1
    max_replicas = 3

    metric {
      type = "Resource"

      resource {
        name = "cpu"

        target {
          type               = "Utilization"
          average_utilization = 80
        }
      }
    }
  }
}
