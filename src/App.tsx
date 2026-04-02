import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import CaseStudy from "./pages/CaseStudy.tsx";
import Projects from "./pages/Projects.tsx";
import Insights from "./pages/Insights.tsx";
import InsightPost from "./pages/InsightPost.tsx";
import ContactPage from "./pages/Contact.tsx";
import Login from "./pages/Login.tsx";
import Admin from "./pages/Admin.tsx";
import Navbar from "./components/Navbar.tsx";
import NotFound from "./pages/NotFound.tsx";
import BackToTop from "./components/BackToTop.tsx";
import StyleProvider from "./components/StyleProvider.tsx";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <StyleProvider />
      <Navbar />
      <Outlet />
      <BackToTop />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Index /> },
      { path: "/projects", element: <Projects /> },
      { path: "/project/:slug", element: <CaseStudy /> },
      { path: "/insights", element: <Insights /> },
      { path: "/insights/:slug", element: <InsightPost /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/login", element: <Login /> },
      { path: "/admin/*", element: <Admin /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RouterProvider router={router} />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
