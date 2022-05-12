import { CategoryService } from './../shared/category.service';
import { Category } from './../shared/category.model';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import toastr from "toastr";
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string = '';
  categoryForm!: FormGroup;
  pageTitle: string = '';
  serverErrorMessages: string[]= [];
  submittngForm: boolean = false;
  category: Category = new Category();
  
  
  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuider: FormBuilder
    
    ) { }
    
    ngOnInit() {
      this.setCurrentAction();
      this.buildCategoryForm();
      this.loadCategory();
    }
    
    ngAfterContentChecked() {
      this.setPageTitle()
    }

  setCurrentAction() {
    if (this.route.snapshot.url[0].path == "new") {
      this.currentAction = '=>(Novo)'
    } else {
      this.currentAction = '=>(editar)'
    }
  }

  submitForm() {
    this.submittngForm = true;

    if(this.submittngForm = true) {
      this.createCategory();
    }else{
      this.updateCategory();
    }
  }

  buildCategoryForm() {
    this.categoryForm = this.formBuider.group({
      id: [null], 
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    })
  }

  loadCategory() {
    if(this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getById(+params.getAll('id')))
      )
      .subscribe(
        (category) => {
          category = category;
          this.categoryForm.patchValue(category)
        },
        (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
      )
    }
  }

  private  setPageTitle() {
    if(this.currentAction == "new") {
      this.pageTitle = 'Cadastro de Nova Categoria'
    }else{
      const categoryName = this.category.name || ' '
      this.pageTitle = 'Editando Categoria: ' + categoryName;
    }
  }

  createCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);
    this.categoryService.create(category)
    .subscribe(
      category => this.actionsForSuccess(category),
      error => this.actionsForError(error)
    )
  }

  updateCategory( ) {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);

    this.categoryService.update(category)
    .subscribe(
      category => this.actionsForSuccess(category),
      error => this.actionsForError(error)
    )
  }

  actionsForSuccess(category: Category) {
    toastr.success('Solicitação procesada com sucesso!');

    this.router.navigateByUrl('categories', { skipLocationChange: true }).then(
      () => this.router.navigate(["/categories", category.id, "edit"])
    )
  }

   actionsForError(error: any) {
    toastr.error('Ocorreu um erro ao processar a sua solicitação!');

    this.submittngForm = false;

    if(error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).erros;
    }else{
      this.serverErrorMessages = ['Falha na comunicação com o servidor. Por favor, tente mais tarde.']
    }
  }
}