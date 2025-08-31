import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import InteractiveComponentPlayground from './pages/interactive-component-playground';
import ComponentLibraryDocumentationHub from './pages/component-library-documentation-hub';
import ComponentAPIReference from './pages/component-api-reference';
import ThemeCustomizationStudio from './pages/theme-customization-studio';
import DataTableComponentDocumentation from './pages/data-table-component-documentation';
import MemoryMazeGameBoard from './pages/memory-maze-game-board';
import PowerUpSelectionMenu from './pages/power-up-selection-menu';
import LevelProgressionDashboard from './pages/level-progression-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ComponentAPIReference />} />
        <Route path="/interactive-component-playground" element={<InteractiveComponentPlayground />} />
        <Route path="/component-library-documentation-hub" element={<ComponentLibraryDocumentationHub />} />
        <Route path="/component-api-reference" element={<ComponentAPIReference />} />
        <Route path="/theme-customization-studio" element={<ThemeCustomizationStudio />} />
        <Route path="/data-table-component-documentation" element={<DataTableComponentDocumentation />} />
        <Route path="/memory-maze-game-board" element={<MemoryMazeGameBoard />} />
        <Route path="/power-up-selection-menu" element={<PowerUpSelectionMenu />} />
        <Route path="/level-progression-dashboard" element={<LevelProgressionDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;