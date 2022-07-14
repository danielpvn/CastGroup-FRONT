import { Categoria } from './../categoria';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  mensagem: string = '';

  categorias!: Categoria[];

  formEdicao!: FormGroup;

  constructor(private httpClient: HttpClient,
     private activatedRoute: ActivatedRoute,
     private router : Router ) { }

  ngOnInit(): void {

    const idCurso = this.activatedRoute.snapshot.paramMap.get('id') as string;

    this.formEdicao = new FormGroup({
      idCurso: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
      dataInicio: new FormControl('', [Validators.required]),
      dataTermino: new FormControl('', [Validators.required]),
      alunos: new FormControl(''),
      categoria: new FormControl('', [Validators.required])
    })

    this.carregarCategorias();

    this.httpClient.get(environment.apiUrl + "/cursos/" + idCurso).subscribe(

      (data: any) => {

        this.formEdicao.patchValue({idCurso: data.idCurso});
        this.formEdicao.patchValue({descricao: data.descricao});
        this.formEdicao.patchValue({dataInicio: data.dataInicio});
        this.formEdicao.patchValue({dataTermino: data.dataTermino});
        this.formEdicao.patchValue({alunos: data.alunos});
        this.formEdicao.patchValue({categoria: data.categoria.idCategoria});
      },
      (e) => {
        console.log(e);
      }
    )
  }

  carregarCategorias() {

    this.httpClient.get(environment.apiUrl + '/categorias').subscribe(
      (data) => { this.categorias = data as any[]; },

      (e) => {
        console.log(e);

      }
    )

  }

  get form(): any {
    return this.formEdicao.controls;
  }

  onSubmit(): void {
    let idCategoria = this.formEdicao.get('categoria')?.value;
    this.formEdicao.get('categoria')?.setValue({idCategoria: idCategoria});
    this.httpClient.put(environment.apiUrl + '/cursos', this.formEdicao.value,
      { responseType: 'text' })
      .subscribe(
        data => {
          alert(data);
          this.router.navigate(['consultar']);
        },
        e => {
          this.mensagem = "Ocorreu um erro, a edição não foi realizada."
          console.log(e);
        }
      )
  }
}
