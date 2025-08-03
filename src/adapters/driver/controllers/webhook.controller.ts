import { Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrderPaymentRepository } from '@repositories/order-payment.repository.impl';
import { OrderRepository } from '@repositories/order.repository.impl';
import { MercadoPagoPaymentUseCase } from '@usecases/webhook/mercadopago/payment';
import { Request, Response } from 'express';
import { MercadoPagoAuthMock } from 'src/adapters/driven/mercadopago/auth/auth.mock';
import { MercadoPagoPaymentMock } from 'src/adapters/driven/mercadopago/payment/payment.mock';

@Controller('webhook')
export class WebhookController {
  private readonly mercadoPagoPaymentUseCase: MercadoPagoPaymentUseCase;

  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderPaymentRepository: OrderPaymentRepository,
    private readonly mpAuthService: MercadoPagoAuthMock,
    private readonly mpPaymentService: MercadoPagoPaymentMock,
  ) {
    this.mercadoPagoPaymentUseCase = new MercadoPagoPaymentUseCase(
      this.orderRepository,
      this.orderPaymentRepository,
      this.mpAuthService,
      this.mpPaymentService,
    );
  }

  @Post('mercadopago')
  @ApiOperation({
    summary: 'Webhook for MercadoPago',
    description: 'Webhook for MercadoPago',
  })
  @ApiResponse({
    status: 200,
    description: 'Webhook processed successfully',
  })
  mercadoPagoWebhook(@Res() res: Response, @Req() req: Request): void {
    try {
      const query = req.query;
      const topic = query.topic;

      switch (topic) {
        case 'payment': {
          const [paymentId, orderId] = [
            query.id as string,
            query.orderId as string,
          ];

          if (!paymentId || !orderId) {
            break;
          }

          void this.mercadoPagoPaymentUseCase.execute(orderId, paymentId);

          break;
        }
      }

      res.status(HttpStatus.OK).send();
    } catch (error) {
      console.error('Error processing webhook:', error);
      res.status(HttpStatus.OK).send();
    }
  }
}
