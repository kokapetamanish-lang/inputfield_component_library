import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const VersionCompatibility = ({ versions, className = '' }) => {
  const [selectedVersion, setSelectedVersion] = useState(versions?.[0]?.version || '');

  const getStatusColor = (status) => {
    switch (status) {
      case 'supported':
        return 'text-success bg-success/10 border-success/20';
      case 'deprecated':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'removed':
        return 'text-error bg-error/10 border-error/20';
      case 'beta':
        return 'text-accent bg-accent/10 border-accent/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'supported':
        return 'CheckCircle';
      case 'deprecated':
        return 'AlertTriangle';
      case 'removed':
        return 'XCircle';
      case 'beta':
        return 'Zap';
      default:
        return 'Circle';
    }
  };

  const selectedVersionData = versions?.find(v => v?.version === selectedVersion);

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="GitBranch" size={20} className="text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Version Compatibility</h2>
      </div>
      {/* Version Selector */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Select Version</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {versions?.map((version) => (
            <button
              key={version?.version}
              onClick={() => setSelectedVersion(version?.version)}
              className={`
                p-3 rounded-lg border-2 transition-micro text-left
                ${selectedVersion === version?.version
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }
              `}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-foreground">{version?.version}</span>
                <div className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(version?.status)}`}>
                  <Icon name={getStatusIcon(version?.status)} size={12} className="inline mr-1" />
                  {version?.status}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{version?.releaseDate}</p>
            </button>
          ))}
        </div>
      </div>
      {/* Version Details */}
      {selectedVersionData && (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                Version {selectedVersionData?.version}
              </h3>
              <div className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(selectedVersionData?.status)}`}>
                <Icon name={getStatusIcon(selectedVersionData?.status)} size={14} className="inline mr-1" />
                {selectedVersionData?.status}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Released on {selectedVersionData?.releaseDate}
            </p>
          </div>

          <div className="p-6 space-y-6">
            {/* Breaking Changes */}
            {selectedVersionData?.breakingChanges && selectedVersionData?.breakingChanges?.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
                  <Icon name="AlertTriangle" size={16} className="text-warning mr-2" />
                  Breaking Changes
                </h4>
                <div className="space-y-2">
                  {selectedVersionData?.breakingChanges?.map((change, index) => (
                    <div key={index} className="p-3 bg-warning/5 border border-warning/20 rounded-lg">
                      <p className="text-sm text-foreground">{change}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Features */}
            {selectedVersionData?.newFeatures && selectedVersionData?.newFeatures?.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
                  <Icon name="Plus" size={16} className="text-success mr-2" />
                  New Features
                </h4>
                <div className="space-y-2">
                  {selectedVersionData?.newFeatures?.map((feature, index) => (
                    <div key={index} className="p-3 bg-success/5 border border-success/20 rounded-lg">
                      <p className="text-sm text-foreground">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Deprecated Features */}
            {selectedVersionData?.deprecated && selectedVersionData?.deprecated?.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
                  <Icon name="Minus" size={16} className="text-warning mr-2" />
                  Deprecated Features
                </h4>
                <div className="space-y-2">
                  {selectedVersionData?.deprecated?.map((item, index) => (
                    <div key={index} className="p-3 bg-warning/5 border border-warning/20 rounded-lg">
                      <p className="text-sm text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Migration Guide */}
            {selectedVersionData?.migrationGuide && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
                  <Icon name="ArrowRight" size={16} className="text-primary mr-2" />
                  Migration Guide
                </h4>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {selectedVersionData?.migrationGuide}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VersionCompatibility;