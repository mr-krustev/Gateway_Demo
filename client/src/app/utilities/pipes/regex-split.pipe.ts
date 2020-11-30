import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'regexSplit'
})
export class RegexSplitPipe implements PipeTransform {

  transform(value: string, regexp: string): string[] {
    return value.toString().split(new RegExp(regexp));
  }

}
