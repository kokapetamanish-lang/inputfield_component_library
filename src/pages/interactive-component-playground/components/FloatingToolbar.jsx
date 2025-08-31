import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FloatingToolbar = ({ 
  onCopyCode, 
  onExportConfig, 
  onSharePlayground, 
  onResetAll,
  instanceCount 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);

  const handleShare = () => {
    // Generate a shareable URL (in real app, this would create a unique link)
    const url = `${window.location?.origin}/interactive-component-playground?shared=true&id=${Date.now()}`;
    setShareUrl(url);
    setShowShareModal(true);
    onSharePlayground(url);
  };

  const copyShareUrl = async () => {
    try {
      await navigator.clipboard?.writeText(shareUrl);
      // Could show a toast notification here
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const toolbarActions = [
    {
      id: 'copy',
      label: 'Copy Code',
      icon: 'Copy',
      action: onCopyCode,
      disabled: instanceCount === 0
    },
    {
      id: 'export',
      label: 'Export Config',
      icon: 'Download',
      action: onExportConfig,
      disabled: instanceCount === 0
    },
    {
      id: 'share',
      label: 'Share',
      icon: 'Share2',
      action: handleShare,
      disabled: instanceCount === 0
    },
    {
      id: 'reset',
      label: 'Reset All',
      icon: 'RotateCcw',
      action: onResetAll,
      disabled: instanceCount === 0,
      variant: 'destructive'
    }
  ];

  return (
    <>
      {/* Floating Toolbar */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className={`
          bg-card border border-border rounded-lg shadow-lg transition-all duration-200
          ${isExpanded ? 'p-2' : 'p-1'}
        `}>
          {isExpanded ? (
            <div className="flex flex-col space-y-1">
              {toolbarActions?.map((action) => (
                <Button
                  key={action?.id}
                  variant={action?.variant || 'ghost'}
                  size="sm"
                  onClick={action?.action}
                  disabled={action?.disabled}
                  iconName={action?.icon}
                  iconPosition="left"
                  className="justify-start min-w-32"
                >
                  {action?.label}
                </Button>
              ))}
              <div className="border-t border-border pt-1 mt-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(false)}
                  iconName="ChevronDown"
                  iconPosition="left"
                  className="justify-start min-w-32"
                >
                  Collapse
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="default"
              size="icon"
              onClick={() => setIsExpanded(true)}
              className="w-12 h-12"
            >
              <Icon name="Settings" size={20} />
            </Button>
          )}
        </div>
      </div>
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Share Playground</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowShareModal(false)}
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Share this playground configuration with others. They'll be able to see and interact with your component setup.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 px-3 py-2 bg-muted border border-border rounded-md text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyShareUrl}
                    iconName="Copy"
                  >
                    Copy
                  </Button>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=Check out this InputField component playground!`, '_blank')}
                    iconName="Twitter"
                    className="flex-1"
                  >
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')}
                    iconName="Linkedin"
                    className="flex-1"
                  >
                    LinkedIn
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingToolbar;