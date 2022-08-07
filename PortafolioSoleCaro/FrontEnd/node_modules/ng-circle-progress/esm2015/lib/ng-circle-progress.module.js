import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircleProgressComponent, CircleProgressOptions } from './ng-circle-progress.component';
export class NgCircleProgressModule {
    static forRoot(options = {}) {
        return {
            ngModule: NgCircleProgressModule,
            providers: [
                { provide: CircleProgressOptions, useValue: options }
            ]
        };
    }
}
NgCircleProgressModule.decorators = [
    { type: NgModule, args: [{
                declarations: [CircleProgressComponent],
                imports: [
                    CommonModule
                ],
                exports: [CircleProgressComponent]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY2lyY2xlLXByb2dyZXNzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy96ZXRhbC90bXAvbmctY2lyY2xlLXByb2dyZXNzLWxpYnJhcnkvcHJvamVjdHMvbmctY2lyY2xlLXByb2dyZXNzL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9uZy1jaXJjbGUtcHJvZ3Jlc3MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsdUJBQXVCLEVBQWtDLHFCQUFxQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFVaEksTUFBTSxPQUFPLHNCQUFzQjtJQUNqQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQTBDLEVBQUU7UUFDekQsT0FBTztZQUNMLFFBQVEsRUFBRSxzQkFBc0I7WUFDaEMsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUU7YUFDdEQ7U0FDRixDQUFDO0lBQ0osQ0FBQzs7O1lBZkYsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLHVCQUF1QixDQUFDO2dCQUN2QyxPQUFPLEVBQUU7b0JBQ1AsWUFBWTtpQkFDYjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQzthQUNuQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ2lyY2xlUHJvZ3Jlc3NDb21wb25lbnQsIENpcmNsZVByb2dyZXNzT3B0aW9uc0ludGVyZmFjZSwgQ2lyY2xlUHJvZ3Jlc3NPcHRpb25zIH0gZnJvbSAnLi9uZy1jaXJjbGUtcHJvZ3Jlc3MuY29tcG9uZW50JztcblxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtDaXJjbGVQcm9ncmVzc0NvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW0NpcmNsZVByb2dyZXNzQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOZ0NpcmNsZVByb2dyZXNzTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3Qob3B0aW9uczogQ2lyY2xlUHJvZ3Jlc3NPcHRpb25zSW50ZXJmYWNlID0ge30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE5nQ2lyY2xlUHJvZ3Jlc3NNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5nQ2lyY2xlUHJvZ3Jlc3NNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBDaXJjbGVQcm9ncmVzc09wdGlvbnMsIHVzZVZhbHVlOiBvcHRpb25zIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=