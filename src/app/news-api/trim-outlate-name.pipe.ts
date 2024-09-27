import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimOutlateNAme',
  standalone: true
})
export class TrimOutlateNAmePipe implements PipeTransform {

  transform(title: String, outlateName:String): unknown {
    return title.replace(`- ${outlateName}`, '')
  }

}
