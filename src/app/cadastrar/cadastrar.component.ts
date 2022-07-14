import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Categoria } from '../categoria';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  mensagem: string = '';

  formCadastro!: FormGroup;

  categorias!: Categoria[];

  constructor(private httpClient: HttpClient,
    private router : Router) { }

  ngOnInit(): void {

    this.formCadastro = new FormGroup({

      descricao: new FormControl('', [Validators.required]),
      dataInicio: new FormControl('', [Validators.required]),
      dataTermino: new FormControl('', [Validators.required]),
      alunos: new FormControl(''),
      categoria: new FormControl('', [Validators.required])

    })

    this.carregarCategorias();

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
    return this.formCadastro.controls;
  }

  onSubmit(): void {
    let idCategoria = this.formCadastro.get('categoria')?.value;
    this.formCadastro.get('categoria')?.setValue({idCategoria: idCategoria});
    this.httpClient.post(environment.apiUrl + '/cursos',
      this.formCadastro.value, { responseType: 'text' }).subscribe(
        data => {
          alert(data);
          this.router.navigate(['consultar']);
        },
        e => {
          this.mensagem = "Cadastro nao realizado";
          console.log(e);
        }
      )
    
  }


}


