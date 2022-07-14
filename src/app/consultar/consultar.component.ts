import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup } from '@angular/forms';
import { concat } from 'rxjs';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

  mensagem: string = '';

  formConsulta!: FormGroup;

  


  constructor(private httpClient: HttpClient) { }

  curso: any[] = [];

  ngOnInit(): void {

    this.formConsulta = new FormGroup({

      descricao: new FormControl(''),
      dataInicio: new FormControl(''),
      dataTermino: new FormControl(''),

    })
    
    this.httpClient.get(environment.apiUrl + '/cursos').subscribe(
      (data) => { this.curso = data as any[]; },

      (e) => {
        console.log(e);

      }
    )
  }

  

  excluir(idCurso: number): void {

    if (window.confirm('Deseja realmente excluir o curso selecionado?')) {
      this.httpClient.delete(environment.apiUrl + "/cursos/" + idCurso,
        { responseType: 'text' })
        .subscribe(
          (data) => {

            alert(data);
            this.ngOnInit();

          },
          (e) => {
            console.log(e);
          }
        )
    }

  }

  get form(): any {
    return this.formConsulta.controls;
  }

  onSubmit(): void {
    let filtro = this.getFiltros()
    this.httpClient.get(environment.apiUrl + "/cursos?"+filtro).subscribe(
      (data) => { this.curso = data as any[]; },
      (error) => {
        alert(error.error);
        console.log(error.error);
        console.log(this.curso);
      }
    )
  }

  getFiltros(): string{
    let filtro = "";
    if (this.formConsulta.value.descricao != "") {
      filtro= filtro.concat("descricao=").concat(this.formConsulta.value.descricao)
    }
    if (this.formConsulta.value.dataInicio != "") {
      filtro= filtro.concat("&dataInicio=").concat(this.formConsulta.value.dataInicio)
    }
    if (this.formConsulta.value.dataTermino != "") {
      filtro= filtro.concat("&dataTermino=").concat(this.formConsulta.value.dataTermino)
    }
    return filtro;
  }
}
