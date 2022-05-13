import { Entry } from './../shared/entry.model';
import { EntryService } from './../shared/entry.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = [];

  constructor(private entryService: EntryService) { }

  ngOnInit(): void {

    this.entryService.geAll().subscribe(
      entries => this.entries = entries,
      error => alert('Erro ao carregar a lista')
    )
  }

  deleteEntry(entry: any) {
    const mgsDelete = confirm('Deseja realmente excluir este item?');

    if(mgsDelete) {

      this.entryService.delete(entry.id).subscribe(
        () => this.entries = this.entries.filter(element => element != entry),
        () => alert('Erro ao excluir!')
      )
    }
  }
}
