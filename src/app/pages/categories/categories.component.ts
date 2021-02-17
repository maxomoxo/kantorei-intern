import {Component, OnInit} from "@angular/core";
import { SmartTableData } from "app/@core/data/smart-table";
import { Kategorie } from "app/@core/models/kategorie";
import { DataService } from "app/@core/utils/data.service";
import { HttpService } from "app/@core/utils/http.service";

@Component(
  {selector: "ngx-categories", 
  templateUrl: "./categories.component.html", 
  styleUrls: ["./categories.component.scss"]
})
export class CategoriesComponent implements OnInit {
  
  constructor(public dataService : DataService, private http : HttpService, private service : SmartTableData) {
    this.dataService.categorySettings = {
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true
      },
      columns: {
        name: {
          title: "Name"
        }
      }
    };
  }
  
  ngOnInit(): void {
  }

  onSaveConfirm(event): void {
    if (event.newData.name != "") {
      let kategorie: Kategorie = {
        name: event.newData.name,
        veranstalter: this.dataService.veranstalter
      };

      this.http.postKategorie(kategorie).subscribe(() => {
        this.dataService.loadCategoriesOfVeranstalter();
        event.confirm.resolve();
      });

    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event): void {
    if (event.newData.name != "") {
      let kategorie: Kategorie = {
        id: event.data.id,
        name: event.newData.name,
        veranstalter: this.dataService.veranstalter
      };

      this.http.updateKategorie(kategorie).subscribe(() => {
        this.dataService.loadCategoriesOfVeranstalter();
        event.confirm.resolve();
      });
    } else {
      event.confirm.reject();
    }
  }

  onDeleteConfirm(event): void {
    if (window.confirm("Willst du diese Kategorie wirklich löschen?")) {
      this.dataService.categoryList.forEach((category) => {
        if (category.id == event.data.id) {
          this.http.deleteKategorie(category).subscribe(() => {
            event.confirm.resolve();
            this.dataService.loadCategoriesOfVeranstalter();
          });
        }
      });
    } else {
      event.confirm.reject();
    }
  }
}
