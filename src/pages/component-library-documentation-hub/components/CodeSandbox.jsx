import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CodeSandbox = ({ component }) => {
  const [activeCodeTab, setActiveCodeTab] = useState('usage');
  const [copied, setCopied] = useState(false);

  const codeExamples = {
    usage: `import Input from 'components/ui/Input';

function MyComponent() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    if (error) setError('');
  };

  const handleValidation = () => {
    if (!value.trim()) {
      setError('This field is required');
    }
  };

  return (
    <Input
      label="${component?.name || 'Input Field'}"
      type="${component?.id === 'password-input' ? 'password' : 'text'}"
      placeholder="Enter ${component?.name?.toLowerCase() || 'text'}..."
      value={value}
      onChange={handleChange}
      onBlur={handleValidation}
      error={error}
      description="Helper text for the input"
    />
  );
}`,
    import: `// ES6 Import
import Input from 'components/ui/Input';

// CommonJS Import
const Input = require('components/ui/Input');

// TypeScript Import
import Input, { InputProps } from 'components/ui/Input'
;`,
    typescript: `interface ${component?.name?.replace(/\s+/g, '') || 'Input'}Props {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

const ${component?.name?.replace(/\s+/g, '') || 'Input'}: React.FC<${component?.name?.replace(/\s+/g, '') || 'Input'}Props> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  description,
  disabled = false,
  required = false,
  className,
  ...props
}) => {
  // Component implementation
};`
  };

  const codeTabs = [
    { id: 'usage', label: 'Usage', icon: 'Play' },
    { id: 'import', label: 'Import', icon: 'Download' },
    { id: 'typescript', label: 'TypeScript', icon: 'FileCode' }
  ];

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard?.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const installCommand = `npm install @inputfield/react-components`;
  const yarnCommand = `yarn add @inputfield/react-components`;

  if (!component) {
    return (
      <div className="w-80 bg-card border-l border-border h-full flex items-center justify-center">
        <div className="text-center p-6">
          <Icon name="Code" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Code Preview</h3>
          <p className="text-sm text-muted-foreground">Select a component to view code examples</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-card border-l border-border h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-2">Code Sandbox</h3>
        <p className="text-sm text-muted-foreground">
          Copy and paste ready-to-use code
        </p>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex border-b border-border">
          {codeTabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveCodeTab(tab?.id)}
              className={`
                flex items-center space-x-1 px-3 py-2 text-xs font-medium transition-micro
                ${activeCodeTab === tab?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
            >
              <Icon name={tab?.icon} size={12} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 relative">
          <div className="absolute top-2 right-2 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(codeExamples?.[activeCodeTab])}
              className="w-8 h-8"
            >
              <Icon name={copied ? 'Check' : 'Copy'} size={14} />
            </Button>
          </div>
          
          <pre className="h-full overflow-auto p-4 text-xs bg-muted/30 font-mono">
            <code className="text-foreground whitespace-pre-wrap">
              {codeExamples?.[activeCodeTab]}
            </code>
          </pre>
        </div>
      </div>
      <div className="p-4 border-t border-border space-y-3">
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">Installation</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-muted/50 rounded px-3 py-2">
              <code className="text-xs text-foreground font-mono">{installCommand}</code>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(installCommand)}
                className="w-6 h-6"
              >
                <Icon name="Copy" size={12} />
              </Button>
            </div>
            <div className="flex items-center justify-between bg-muted/50 rounded px-3 py-2">
              <code className="text-xs text-foreground font-mono">{yarnCommand}</code>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(yarnCommand)}
                className="w-6 h-6"
              >
                <Icon name="Copy" size={12} />
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">Quick Links</h4>
          <div className="space-y-1">
            <button className="flex items-center space-x-2 w-full px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-micro">
              <Icon name="ExternalLink" size={12} />
              <span>View on GitHub</span>
            </button>
            <button className="flex items-center space-x-2 w-full px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-micro">
              <Icon name="Package" size={12} />
              <span>View on NPM</span>
            </button>
            <button className="flex items-center space-x-2 w-full px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-micro">
              <Icon name="Bug" size={12} />
              <span>Report Issue</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeSandbox;