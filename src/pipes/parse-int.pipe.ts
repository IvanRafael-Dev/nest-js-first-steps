import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { InvalidParamError } from 'src/errors/invalid-param-error';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      throw new InvalidParamError(
        `Validation failed. "${metadata.data}" must be an integer.`,
      );
    }
    return parsedValue;
  }
}
