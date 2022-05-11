import { CategoryService } from './../shared/category.service';
import { Category } from './../shared/category.model';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string = '';
  categoryForm!: FormGroup;
  pageTitle: string = '';
  // serverErrorMessages: string[]= ;
  submittngForm: boolean = false;
  category: Category = new Category();
  
  
  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private routes: Router,
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
      this.currentAction = "new"
    } else {
      this.currentAction = "edit"
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
        switchMap(params => this.categoryService.getById(+params.getAll("id")))
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
    if(this.currentAction == 'new') {
      this.pageTitle = 'Cadastro de Nova Categoria'
    }else{
      const categoryName = this.category.name || ''
      this.pageTitle = 'Editando Categoria: ' + categoryName;
    }
  }
}
