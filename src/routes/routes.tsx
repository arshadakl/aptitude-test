import { 
  createRootRoute, 
  createRoute, 
  createRouter
} from '@tanstack/react-router';


import Home from '../pages/Home';
import Instructions from '@/pages/Instructions';
import ExamPage from '@/pages/Exam';


const rootRoute = createRootRoute();

const indexRoute = createRoute(
    {
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const instructionsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/instructions',  
    component: Instructions,  
  });

const aptitudeTestRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/aptitude-test',  
    component: ExamPage,  
  });


const routeTree = rootRoute.addChildren([indexRoute,instructionsRoute,aptitudeTestRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}