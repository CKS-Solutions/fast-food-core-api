import { Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MercadoPagoPaymentUseCase } from '@usecases/webhook/mercadopago/payment';
import { Request, Response } from 'express';

@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly mercadoPagoPaymentUseCase: MercadoPagoPaymentUseCase,
  ) {}

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
