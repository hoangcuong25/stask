import { Routes } from '@angular/router';
import { MyTasksComponent } from './pages/my-tasks/my-tasks.component';
import { PersonalPlanComponent } from './pages/personal-plan/personal-plan.component';
import { ProjectsSpaceComponent } from './pages/projects-space/projects-space.component';
import { WorklogsComponent } from './pages/worklogs/worklogs.component';
import { CalendarComponent } from './pages/calendar/calendar.component';

export const routes: Routes = [
  { path: '', redirectTo: 'my-tasks', pathMatch: 'full' },
  { path: 'my-tasks', component: MyTasksComponent },
  { path: 'personal-plan', component: PersonalPlanComponent },
  { path: 'projects', component: ProjectsSpaceComponent },
  { path: 'worklogs', component: WorklogsComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'settings', component: ProjectsSpaceComponent },

  // Khi định tuyến từ front-end root (/swork/...)
  {
    path: 'swork',
    children: [
      { path: '', redirectTo: 'my-tasks', pathMatch: 'full' },
      { path: 'my-tasks', component: MyTasksComponent },
      { path: 'personal-plan', component: PersonalPlanComponent },
      { path: 'projects', component: ProjectsSpaceComponent },
      { path: 'worklogs', component: WorklogsComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'settings', component: ProjectsSpaceComponent },
    ]
  },

  { path: '**', redirectTo: 'my-tasks' }
];

