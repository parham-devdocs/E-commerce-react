import { PartialType } from '@nestjs/mapped-types';
import { createInvoiceDTO } from './create-payment.dto';

export class UpdateInvoiceDto extends PartialType(createInvoiceDTO) {}
