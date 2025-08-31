import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import TabNavigation from '../../components/ui/TabNavigation';
import BreadcrumbNavigation from './components/BreadcrumbNavigation';
import ConfigurationPanel from './components/ConfigurationPanel';
import PreviewPanel from './components/PreviewPanel';
import CodeGenerator from './components/CodeGenerator';
import FloatingToolbar from './components/FloatingToolbar';

const InteractiveComponentPlayground = () => {
  const [activeTab, setActiveTab] = useState('controls');
  const [showCodeGenerator, setShowCodeGenerator] = useState(false);
  const [instances, setInstances] = useState([]);
  const [currentConfig, setCurrentConfig] = useState({
    label: 'Sample Input',
    placeholder: 'Enter text here...',
    description: 'This is a helper text',
    type: 'text',
    size: 'default',
    variant: 'default',
    disabled: false,
    required: false,
    loading: false,
    error: '',
    minLength: '',
    maxLength: '',
    pattern: ''
  });

  // Initialize with a default instance
  useEffect(() => {
    addInstance();
  }, []);

  const generateInstanceId = () => {
    return `instance_${Date.now()}_${Math.random()?.toString(36)?.substr(2, 9)}`;
  };

  const addInstance = () => {
    const newInstance = {
      id: generateInstanceId(),
      config: { ...currentConfig },
      value: ''
    };
    setInstances(prev => [...prev, newInstance]);
  };

  const updateInstance = (instanceId, updates) => {
    setInstances(prev =>
      prev?.map(instance =>
        instance?.id === instanceId
          ? { ...instance, ...updates }
          : instance
      )
    );
  };

  const removeInstance = (instanceId) => {
    setInstances(prev => prev?.filter(instance => instance?.id !== instanceId));
  };

  const reorderInstances = (fromIndex, toIndex) => {
    setInstances(prev => {
      const newInstances = [...prev];
      const [movedInstance] = newInstances?.splice(fromIndex, 1);
      newInstances?.splice(toIndex, 0, movedInstance);
      return newInstances;
    });
  };

  const handleConfigChange = (newConfig) => {
    setCurrentConfig(newConfig);
  };

  const handleCopyCode = () => {
    setShowCodeGenerator(true);
  };

  const handleExportConfig = () => {
    const exportData = {
      timestamp: new Date()?.toISOString(),
      version: '2.1.0',
      instances: instances?.map(instance => ({
        id: instance?.id,
        config: instance?.config
      }))
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `playground-config-${Date.now()}.json`;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSharePlayground = (url) => {
    console.log('Sharing playground:', url);
    // In a real app, this would save the configuration to a backend
  };

  const handleResetAll = () => {
    if (window.confirm('Are you sure you want to reset all instances? This action cannot be undone.')) {
      setInstances([]);
      setCurrentConfig({
        label: 'Sample Input',
        placeholder: 'Enter text here...',
        description: 'This is a helper text',
        type: 'text',
        size: 'default',
        variant: 'default',
        disabled: false,
        required: false,
        loading: false,
        error: '',
        minLength: '',
        maxLength: '',
        pattern: ''
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <div className="pt-16 pb-16 md:pb-0">
        {/* Page Header */}
        <div className="bg-card border-b border-border">
          <div className="px-6 py-4">
            <BreadcrumbNavigation />
            <div className="mt-4 mb-6">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Interactive Component Playground
              </h1>
              <p className="text-muted-foreground">
                Experiment with input field components in real-time. Test all variants, states, and configurations before implementation.
              </p>
            </div>
            <TabNavigation className="hidden md:flex" />
          </div>
        </div>

        {/* Mobile Tab Navigation */}
        <div className="md:hidden bg-card border-b border-border px-6 py-2">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('controls')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'controls' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Controls
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'preview' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Preview
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex h-[calc(100vh-200px)] md:h-[calc(100vh-160px)]">
          {/* Desktop Layout */}
          <div className="hidden md:flex w-full">
            {/* Configuration Panel - 40% */}
            <div className="w-2/5">
              <ConfigurationPanel
                config={currentConfig}
                onConfigChange={handleConfigChange}
                onAddInstance={addInstance}
                onExportConfig={handleExportConfig}
                onCopyCode={handleCopyCode}
              />
            </div>

            {/* Preview Panel - 60% */}
            <div className="flex-1">
              <PreviewPanel
                instances={instances}
                onUpdateInstance={updateInstance}
                onRemoveInstance={removeInstance}
                onReorderInstances={reorderInstances}
              />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden w-full">
            {activeTab === 'controls' ? (
              <ConfigurationPanel
                config={currentConfig}
                onConfigChange={handleConfigChange}
                onAddInstance={addInstance}
                onExportConfig={handleExportConfig}
                onCopyCode={handleCopyCode}
              />
            ) : (
              <PreviewPanel
                instances={instances}
                onUpdateInstance={updateInstance}
                onRemoveInstance={removeInstance}
                onReorderInstances={reorderInstances}
              />
            )}
          </div>
        </div>
      </div>
      {/* Floating Toolbar */}
      <FloatingToolbar
        onCopyCode={handleCopyCode}
        onExportConfig={handleExportConfig}
        onSharePlayground={handleSharePlayground}
        onResetAll={handleResetAll}
        instanceCount={instances?.length}
      />
      {/* Code Generator Modal */}
      {showCodeGenerator && (
        <CodeGenerator
          config={currentConfig}
          onClose={() => setShowCodeGenerator(false)}
        />
      )}
    </div>
  );
};

export default InteractiveComponentPlayground;