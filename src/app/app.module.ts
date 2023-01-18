import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';

import {ReactiveFormsModule} from '@angular/forms';

import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

import {AppComponent} from './app.component';
import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';
import {HeaderComponent} from './layouts/component/header/header.component';
import {SidebarComponent} from './layouts/component/sidebar/sidebar.component';
import {ContentComponent} from './layouts/component/content/content.component';
import {CountPipe} from './pipes/count.pipe';
import {ActionBtnHideComponent} from './features/action-btn-hide/action-btn-hide.component';
import {LogoComponent} from './layouts/component/header/logo/logo.component';
import {ActionFormComponent} from './layouts/component/header/action-form/action-form.component';
import {HeadComponent} from './layouts/component/header/head/head.component';
import {SidebarHeadComponent} from './layouts/component/sidebar/sidebar-head/sidebar-head.component';
import {SidebarActionComponent} from './layouts/component/sidebar/sidebar-action/sidebar-action.component';
import {SidebarCreateNewComponent} from './layouts/component/sidebar/sidebar-create-new/sidebar-create-new.component';
import {SidebarDarkModeComponent} from './layouts/component/sidebar/sidebar-dark-mode/sidebar-dark-mode.component';
import {SidebarHideComponent} from './layouts/component/sidebar/sidebar-hide/sidebar-hide.component';
import {ColumnCreateComponent} from "./layouts/component/content/column-create/column-create.component";
import {
  ContentColumnNameComponent
} from './layouts/component/content/content-column-list/content-column-name/content-column-name.component';
import {
  ContentCardComponent
} from './layouts/component/content/content-column-list/content-tasks/content-card/content-card.component';
import {
  ContentColumnListComponent
} from './layouts/component/content/content-column-list/content-column-list.component';
import {
  ContentTasksComponent
} from './layouts/component/content/content-column-list/content-tasks/content-tasks.component';
import {
  ModalWindowComponent
} from './layouts/component/content/content-column-list/content-tasks/modal-window/modal-window.component';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from "./store";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {ActiveBtnDirective} from './directives/active-btn.directive';
import {ModalComponent} from './layouts/component/sidebar/sidebar-create-new/modal/modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {EffectsModule} from '@ngrx/effects';
import {AppEffects} from './app.effects';
import {LogoDirective} from './directives/logo.directive';
import {
  SubModalComponent
} from './layouts/component/content/content-column-list/content-tasks/sub-modal/sub-modal.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatListModule} from "@angular/material/list";
import {MatSelectModule} from "@angular/material/select";
import {CheckedDirective} from './directives/checked.directive';
import {
  EditTaskDialogComponent
} from './layouts/component/content/content-column-list/content-tasks/sub-modal/edit-task-dialog/edit-task-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    CountPipe,
    ActionBtnHideComponent,
    LogoComponent,
    ActionFormComponent,
    HeadComponent,
    SidebarHeadComponent,
    SidebarActionComponent,
    SidebarCreateNewComponent,
    SidebarDarkModeComponent,
    SidebarHideComponent,
    ColumnCreateComponent,
    ContentColumnNameComponent,
    ContentCardComponent,
    ContentColumnListComponent,
    ContentTasksComponent,
    ModalWindowComponent,
    ActiveBtnDirective,
    ModalComponent,
    LogoDirective,
    SubModalComponent,
    CheckedDirective,
    EditTaskDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
    EffectsModule.forRoot([AppEffects]),
    MatMenuModule,
    MatCheckboxModule,
    MatListModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
