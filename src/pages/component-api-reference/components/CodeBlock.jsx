import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CodeBlock = ({ code, language = 'jsx', title, expandable = false, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(!expandable);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard?.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const formatCode = (code) => {
    // Simple syntax highlighting for JSX/TypeScript
    return code?.replace(/(import|export|const|let|var|function|class|interface|type|enum)/g, '<span class="text-purple-400">$1</span>')?.replace(/(string|number|boolean|object|array|null|undefined)/g, '<span class="text-blue-400">$1</span>')?.replace(/(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g, '<span class="text-green-400">$1$2$3</span>')?.replace(/(\/\/.*$)/gm, '<span class="text-gray-500">$1</span>')?.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-gray-500">$1</span>');
  };

  return (
    <div className={`bg-muted rounded-lg border border-border overflow-hidden ${className}`}>
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-card border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Code" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">{title}</span>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
              {language}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {expandable && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-muted-foreground hover:text-foreground transition-micro"
                title={isExpanded ? 'Collapse' : 'Expand'}
              >
                <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
              </button>
            )}
            <button
              onClick={handleCopy}
              className="text-muted-foreground hover:text-foreground transition-micro"
              title="Copy code"
            >
              <Icon name={isCopied ? 'Check' : 'Copy'} size={16} />
            </button>
          </div>
        </div>
      )}
      
      {isExpanded && (
        <div className="relative">
          <pre className="p-4 overflow-x-auto text-sm">
            <code 
              className="text-foreground font-mono"
              dangerouslySetInnerHTML={{ __html: formatCode(code) }}
            />
          </pre>
          
          {!title && (
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-2 bg-background border border-border rounded-md text-muted-foreground hover:text-foreground transition-micro"
              title="Copy code"
            >
              <Icon name={isCopied ? 'Check' : 'Copy'} size={14} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeBlock;