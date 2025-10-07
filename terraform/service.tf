resource "kubernetes_service" "fast_food_service" {
  metadata {
    name      = "fast-food-service"
    namespace = "default"
  }

  spec {
    selector = {
      app = "fast-food"
    }

    port {
      port        = 80
      target_port = 3000
      node_port   = 30051
    }

    type = "LoadBalancer"
  }
}
