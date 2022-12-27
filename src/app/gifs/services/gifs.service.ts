import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial:string[]=[];

  private _servicioUrl:string='https://api.giphy.com/v1/gifs';

  private apiKey:string='mYqo99qcGyLnmzFxDgFIGrn5FH2vUJxM';

  public resultados:Gif[]=[];

  get historial(){


    return [...this._historial];
  }

  constructor(private http:HttpClient){

    this._historial=JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados=JSON.parse(localStorage.getItem('resultados')!) || [];

    // if(localStorage.getItem('historial')){
    //   // this._historial=JSON.parse(localStorage.getItem('historial')!);
    // }
  }



  // async 
  buscarGifs(query:string=''){

    query=query.trim().toLocaleLowerCase();
    
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial=this._historial.splice(0,10);
      localStorage.setItem('historial',JSON.stringify(this._historial));
      
    }

    const params=new HttpParams()
      .set('apikey',this.apiKey)
      .set('limit','10')
      .set('q',query)



    // this.http.get<SearchGifResponse>(`https://api.giphy.com/v1/gifs/search?api_key=mYqo99qcGyLnmzFxDgFIGrn5FH2vUJxM&q=${query}&limit=10`)
    this.http.get<SearchGifResponse>(`${this._servicioUrl}/search`,{params:params})
      .subscribe(
        (resp)=>{
          // console.log(resp.data);
          this.resultados=resp.data;
          localStorage.setItem('resultados',JSON.stringify(this.resultados));
          // resp.data[0].images.downsized.url
        }
      )

    // const resp=await fetch('https://api.giphy.com/v1/gifs/search?api_key=mYqo99qcGyLnmzFxDgFIGrn5FH2vUJxM&q=dragon ball z&limit=10');
    // const data=await resp.json();
    // console.log(data);

    // console.log(this._historial);
  }




}
