import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DarkModeService} from 'src/app/services/dark-mode.service';
import {buttonsList, ButtonsList} from "../../../../assets/data/buttons";
import {Observable} from "rxjs";
import {TitleNameService} from "../../../services/title-name.service";
import {ContentService} from 'src/app/services/content.service';
import {list, list2} from "../../../../assets/data/dataList";
import {HideAsideService} from "../../../services/hide-aside.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit{

  mode$:Observable<boolean>
  listButton:ButtonsList[]=buttonsList

  constructor(private darkService: DarkModeService,
              private titleService: TitleNameService,
              private contentService: ContentService,
              private hideService:HideAsideService
              ) { }

  ngOnInit(): void {
    this.mode$= this.darkService.darkMode$
    console.log('sidebar')
  }

  toggleMode() {
    this.darkService.toogleMode()
  }

  activeButton(el:ButtonsList) {
    this.listButton.map(a=>
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
    })
  }

  addButton():void{
    let item:ButtonsList={
      name:'oleg',
      class:'SideNav__tab',
      id:this.randomId()
    }
    this.listButton.push(item)
  }

  randomId():number{
    let x=Math.floor(Math.random()*1000)
    return this.listButton.some(el=>el.id===x)?this.randomId():x
  }

  changeVisible() {
    this.hideService.changeHide()
  }
}
