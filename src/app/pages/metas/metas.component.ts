import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { MetasService } from 'src/app/services/metas.service';

@Component({
  selector: 'app-metas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.css']
})
export class MetasComponent implements OnInit {
  
  constructor(private metasService: MetasService){

  }
  
  ngOnInit(): void {
    
  }
  
  obterMetasUsuario(){
    
    this.metasService.obterMetasUsuario(10)
    .subscribe((Response: any) => console.log(Response));
  }
}
