import { Component, OnInit ,Input,Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  img: string =''; //se utilzia en el padre
  @Input('img')
  set changeImg(newImg: string){
    this.img=newImg;
    console.log('change just img=> ',this.img);
  }

  @Input() fraseHijo: string ='frase inspiradora';
  @Output()loaded =new EventEmitter<string>();
  imgDefault="../../../assets/images/default.jpg";
  counter: number=0;
  counterFn: number | undefined;

  constructor() {
    //before render no se debe correr cosas async HACER COSAS INMEDIATAS
    // se corre una sola vez
    console.log('constructor','imgValue =>',this.img);

  }
  ngOnChanges(changes: SimpleChanges): void {
    //corre antes del render, actualiza los cambios en inputs
    console.log('ngOnchange','imgValue =>',this.img);
  }

  ngOnInit(): void {
    //se pueden correr asincronas digamos llamar una api etc
    // cosas que necesitan esperar
    console.log('ngOnInit','imgValue =>',this.img);
    this.counterFn=window.setInterval(()=>{ //no es buena practica el setInterval
      this.counter +=1;
      console.log('run counter')
    },1000)
  }
  ngAfterViewInit(): void {
      // corre despues
      //manejamos los hijos ejecutar hijos de forma code no en html
      console.log('ngAfterView');
  }

  ngOnDestroy(): void {
      // se elimina el componente l odejamos de ver en la interfaz
      console.log('ngOnDestroy');
      window.clearInterval(this.counterFn); //matar el contador de intervalo
  }
  imgError(){
    this.img = this.imgDefault;
  }
  imgLoaded(){
    console.log('log hijo');
    this.loaded.emit(this.img);
  }
}
