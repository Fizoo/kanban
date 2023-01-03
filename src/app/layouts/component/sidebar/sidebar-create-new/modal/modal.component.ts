import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {KanbanActions} from "../../../../../store/actions";
import {Boards, Columns} from "../../../../../../assets/data/model";

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

  constructor(private store:Store,
    public dialogRef: MatDialogRef<ModalComponent>) {}


  addColumns() {
    this.columnsArr.push({column:''})
  }

  deleteColumn(i:number) {
   this.columnsArr= this.columnsArr.filter((el,index)=>index!==i)
  }

  closed() {
    let columns:Columns[]=this.columnsArr.map((el)=>{
      return {
        name: el.column,
        id: new Date().getTime(),
        tasks: []
      }
    })

   let board:Boards= {
     name:this.name,
     id:new Date().getTime(),
     columns
   }
   console.log('board',board)
    this.store.dispatch(KanbanActions.addBoard({board}))
    this.dialogRef.close()
  }
}
