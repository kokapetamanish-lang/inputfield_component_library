import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import CodeBlock from './CodeBlock';

const TypeDefinition = ({ title, interfaces, className = '' }) => {
  const [expandedInterfaces, setExpandedInterfaces] = useState(new Set());

  const toggleInterface = (interfaceName) => {
    const newExpanded = new Set(expandedInterfaces);
    if (newExpanded?.has(interfaceName)) {
      newExpanded?.delete(interfaceName);
    } else {
      newExpanded?.add(interfaceName);
    }
    setExpandedInterfaces(newExpanded);
  };

  const formatInterface = (interfaceData) => {
    const { name, extends: extendsFrom, properties } = interfaceData;
    
    let code = `interface ${name}`;
    if (extendsFrom) {
      code += ` extends ${extendsFrom}`;
    }
    code += ' {\n';
    
    properties?.forEach(prop => {
      const optional = prop?.required ? '' : '?';
      const comment = prop?.description ? `  // ${prop?.description}\n` : '';
      code += `${comment}  ${prop?.name}${optional}: ${prop?.type};\n`;
    });
    
    code += '}';
    return code;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {title && (
        <div className="flex items-center space-x-2 mb-6">
          <Icon name="FileType" size={20} className="text-primary" />
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        </div>
      )}
      {interfaces?.map((interfaceData) => (
        <div key={interfaceData?.name} className="bg-card border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleInterface(interfaceData?.name)}
            className="w-full px-6 py-4 text-left hover:bg-muted transition-micro"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Braces" size={16} className="text-primary" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{interfaceData?.name}</h3>
                  {interfaceData?.description && (
                    <p className="text-sm text-muted-foreground mt-1">{interfaceData?.description}</p>
                  )}
                </div>
              </div>
              <Icon 
                name={expandedInterfaces?.has(interfaceData?.name) ? 'ChevronUp' : 'ChevronDown'} 
                size={16} 
                className="text-muted-foreground"
              />
            </div>
          </button>

          {expandedInterfaces?.has(interfaceData?.name) && (
            <div className="border-t border-border">
              <div className="p-6">
                <CodeBlock
                  code={formatInterface(interfaceData)}
                  language="typescript"
                  title={`${interfaceData?.name} Interface`}
                />

                {interfaceData?.examples && interfaceData?.examples?.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-foreground mb-3">Usage Examples</h4>
                    <div className="space-y-4">
                      {interfaceData?.examples?.map((example, index) => (
                        <CodeBlock
                          key={index}
                          code={example?.code}
                          language="jsx"
                          title={example?.title}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {interfaceData?.notes && (
                  <div className="mt-6 p-4 bg-muted rounded-lg border-l-4 border-primary">
                    <div className="flex items-start space-x-2">
                      <Icon name="Info" size={16} className="text-primary mt-0.5" />
                      <div>
                        <h5 className="text-sm font-medium text-foreground mb-1">Notes</h5>
                        <p className="text-sm text-muted-foreground">{interfaceData?.notes}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TypeDefinition;