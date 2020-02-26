import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FormationsComponent } from "./formations/formations.component";
import { PersonnesComponent } from "./personnes/personnes.component";

const routes: Routes = [
  { path: "formations", component: FormationsComponent },
  { path: "personnes", component: PersonnesComponent },
  { path: "**", redirectTo: "formations" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
