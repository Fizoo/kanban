import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

interface Column{
  column: string
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent {


  columnsArr:Column[]=[{
    column: ''
  }]
  name=''

  constructor(public dialogRef: MatDialogRef<ModalComponent>) {}


  addColumns() {
    this.columnsArr.push({column:''})
  }

  deleteColumn(i:number) {
   this.columnsArr= this.columnsArr.filter((el,index)=>index!==i)
  }

  closed() {
   let x= {name:this.name,columns:this.columnsArr}
    this.dialogRef.close()
  }
}
