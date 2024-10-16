import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Fizetdto } from './fizet.dto';
import { Response, response } from 'express';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }
  @Get('fizet')
  @Render('kifizetes')
  kifizetes(){
return{
  data:{},
  errors: []
}
  };

  @Post('fizet')
  fizet(@Body() fizetdto: Fizetdto, @Res() response: Response){
    const errors: string[] =[];

    if(!fizetdto.nev || !fizetdto.bankszamla){
      errors.push('Minden mezőt kötelező megadni')
    }
    if(fizetdto.nev.trim().length === 0){
      errors.push('minimum tartalmazzon egy, nem szóköz jellegű karaktert')
    }

    if(!/^\d{8}-\d{8}-\d{8}$/.test(fizetdto.bankszamla ) && !/^\d{8}-\d{8}$/.test(fizetdto.bankszamla) ){
      errors.push('A bankszámla nem megfelelő formátumú!')
    }
 
   if(errors.length> 0){
   return response.render('kifizetes',{
      data: fizetdto,
      errors
    })
   }
    
    return response.redirect(303, 'orderSuccess')
  }


  @Get('orderSuccess')
  @Render('success')
  Ordersuccess(){

  }
    
  }
  

