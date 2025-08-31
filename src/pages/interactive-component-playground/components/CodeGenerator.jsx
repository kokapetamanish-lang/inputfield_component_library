import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CodeGenerator = ({ config, onClose }) => {
  const [codeType, setCodeType] = useState('jsx');
  const [copied, setCopied] = useState(false);

  const generateJSXCode = () => {
    const props = [];
    
    if (config?.label) props?.push(`label="${config?.label}"`);
    if (config?.type && config?.type !== 'text') props?.push(`type="${config?.type}"`);
    if (config?.placeholder) props?.push(`placeholder="${config?.placeholder}"`);
    if (config?.description) props?.push(`description="${config?.description}"`);
    if (config?.error) props?.push(`error="${config?.error}"`);
    if (config?.disabled) props?.push('disabled');
    if (config?.required) props?.push('required');
    if (config?.minLength) props?.push(`minLength={${config?.minLength}}`);
    if (config?.maxLength) props?.push(`maxLength={${config?.maxLength}}`);
    if (config?.pattern) props?.push(`pattern="${config?.pattern}"`);
    
    props?.push('value={value}');
    props?.push('onChange={handleChange}');

    return `import Input from "components/ui/Input";

const MyComponent = () => {
  const [value, setValue] = useState('');
  
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Input
      ${props?.join('\n      ')}
    />
  );
};`;
  };

  const generateTypeScriptCode = () => {
    const props = [];
    
    if (config?.label) props?.push(`label="${config?.label}"`);
    if (config?.type && config?.type !== 'text') props?.push(`type="${config?.type}"`);
    if (config?.placeholder) props?.push(`placeholder="${config?.placeholder}"`);
    if (config?.description) props?.push(`description="${config?.description}"`);
    if (config?.error) props?.push(`error="${config?.error}"`);
    if (config?.disabled) props?.push('disabled');
    if (config?.required) props?.push('required');
    if (config?.minLength) props?.push(`minLength={${config?.minLength}}`);
    if (config?.maxLength) props?.push(`maxLength={${config?.maxLength}}`);
    if (config?.pattern) props?.push(`pattern="${config?.pattern}"`);
    
    props?.push('value={value}');
    props?.push('onChange={handleChange}');

    return `import React, { useState, ChangeEvent } from 'react';
import Input from "components/ui/Input";

interface MyComponentProps {
  // Add your component props here
}

const MyComponent: React.FC<MyComponentProps> = () => {
  const [value, setValue] = useState<string>('');
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Input
      ${props?.join('\n      ')}
    />
  );
};

export default MyComponent;`;
  };

  const generatePropsCode = () => {
    const propsObj = {};
    
    if (config?.label) propsObj.label = config?.label;
    if (config?.type && config?.type !== 'text') propsObj.type = config?.type;
    if (config?.placeholder) propsObj.placeholder = config?.placeholder;
    if (config?.description) propsObj.description = config?.description;
    if (config?.error) propsObj.error = config?.error;
    if (config?.disabled) propsObj.disabled = true;
    if (config?.required) propsObj.required = true;
    if (config?.minLength) propsObj.minLength = parseInt(config?.minLength);
    if (config?.maxLength) propsObj.maxLength = parseInt(config?.maxLength);
    if (config?.pattern) propsObj.pattern = config?.pattern;

    return JSON.stringify(propsObj, null, 2);
  };

  const getCode = () => {
    switch (codeType) {
      case 'jsx':
        return generateJSXCode();
      case 'typescript':
        return generateTypeScriptCode();
      case 'props':
        return generatePropsCode();
      default:
        return generateJSXCode();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard?.writeText(getCode());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const getLanguage = () => {
    switch (codeType) {
      case 'jsx': case'typescript':
        return 'javascript';
      case 'props':
        return 'json';
      default:
        return 'javascript';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Generated Code</h2>
            <p className="text-sm text-muted-foreground">
              Copy and paste this code into your project
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Code Type Selector */}
        <div className="flex items-center space-x-1 p-6 pb-0">
          <button
            onClick={() => setCodeType('jsx')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              codeType === 'jsx' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            JSX
          </button>
          <button
            onClick={() => setCodeType('typescript')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              codeType === 'typescript' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            TypeScript
          </button>
          <button
            onClick={() => setCodeType('props')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              codeType === 'props' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            Props JSON
          </button>
        </div>

        {/* Code Display */}
        <div className="flex-1 p-6 pt-4 overflow-hidden">
          <div className="relative h-full">
            <div className="absolute top-2 right-2 z-10">
              <Button
                variant="secondary"
                size="sm"
                onClick={copyToClipboard}
                iconName={copied ? "Check" : "Copy"}
                iconPosition="left"
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <pre className="bg-muted rounded-lg p-4 h-full overflow-auto text-sm">
              <code className={`language-${getLanguage()}`}>
                {getCode()}
              </code>
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Make sure to import the Input component in your project
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button onClick={copyToClipboard} iconName="Copy" iconPosition="left">
                Copy to Clipboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeGenerator;