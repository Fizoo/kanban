import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DarkModeService} from 'src/app/services/dark-mode.service';
import {Observable} from "rxjs";
import {TitleNameService} from "../../../services/title-name.service";
import {ContentService} from 'src/app/services/content.service';
import {HideAsideService} from "../../../services/hide-aside.service";
import {Btn} from "../../../store/reducerBtn";
import {Store} from '@ngrx/store';
import {BtnSelectors} from "../../../store/selectors";
import {BtnActions} from "../../../store/actions";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit{

  mode$:Observable<boolean>
  listButton$:Observable<Btn[]>
  btnCount$:Observable<number>

  constructor(private darkService: DarkModeService,
              private titleService: TitleNameService,
              private contentService: ContentService,
              private hideService:HideAsideService,
              private store: Store
              ) { }

  ngOnInit(): void {
    this.mode$= this.darkService.darkMode$
    this.listButton$=this.store.select(BtnSelectors.getBtn)
    this.btnCount$=this.store.select(BtnSelectors.btnCount)

  }
  toggleMode() {
    this.darkService.toogleMode()
  }

  activeButton(el:Btn) {
    this.store.dispatch(BtnActions.activeBtn({item:el}))
    /*this.listButton.map(a=>
    {
      if (a.id===el.id){
        a.class='SideNav__tab SideNav__tab--active'
        this.titleService.changeName(a.name)
        if(a.name==='Marketing Plan'){
          this.contentService.changeList(list2)
        }
        else this.contentService.changeList(list)
      }
      else {
        a.class='SideNav__tab'
      }
      return a
    })*/
  }

  addButton():void{
 /*   let item:ButtonsList={
      name:'oleg',
      class:'SideNav__tab',
      id:this.randomId()
    }
    this.listButton.push(item)*/
  }

  randomId(){
/*    let x=Math.floor(Math.random()*1000)
    return this.listButton.some(el=>el.id===x)?this.randomId():x*/
  }

  changeVisible() {
    this.hideService.changeHide()
  }
}
