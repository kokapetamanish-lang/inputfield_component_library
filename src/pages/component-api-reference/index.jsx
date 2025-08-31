import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import TableOfContents from './components/TableOfContents';
import SearchInterface from './components/SearchInterface';
import PropTable from './components/PropTable';
import TypeDefinition from './components/TypeDefinition';
import LiveExample from './components/LiveExample';
import CodeBlock from './components/CodeBlock';
import VersionCompatibility from './components/VersionCompatibility';
import Icon from '../../components/AppIcon';

const ComponentAPIReference = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);

  // Mock data for the Input component API
  const inputProps = [
    {
      name: 'label',
      type: 'string',
      default: '',
      required: false,
      description: 'The label text displayed above the input field'
    },
    {
      name: 'type',
      type: '"text" | "email" | "password" | "number" | "tel" | "url" | "search" | "date" | "time" | "datetime-local" | "file"',
      default: '"text"',
      required: false,
      description: 'The input type that determines the input behavior and validation'
    },
    {
      name: 'placeholder',
      type: 'string',
      default: '',
      required: false,
      description: 'Placeholder text shown when the input is empty'
    },
    {
      name: 'value',
      type: 'string | number',
      default: '',
      required: false,
      description: 'The controlled value of the input'
    },
    {
      name: 'onChange',
      type: '(event: ChangeEvent<HTMLInputElement>) => void',
      default: '',
      required: false,
      description: 'Callback function called when the input value changes'
    },
    {
      name: 'description',
      type: 'string',
      default: '',
      required: false,
      description: 'Helper text displayed below the input field'
    },
    {
      name: 'error',
      type: 'string',
      default: '',
      required: false,
      description: 'Error message displayed when validation fails'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      required: false,
      description: 'Whether the input is disabled and non-interactive'
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      required: false,
      description: 'Whether the input is required for form submission'
    },
    {
      name: 'className',
      type: 'string',
      default: '',
      required: false,
      description: 'Additional CSS classes for positioning and spacing'
    }
  ];

  const typeInterfaces = [
    {
      name: 'InputProps',
      description: 'Main interface for Input component props',
      extends: 'React.InputHTMLAttributes<HTMLInputElement>',
      properties: [
        { name: 'label', type: 'string', required: false, description: 'Input label text' },
        { name: 'description', type: 'string', required: false, description: 'Helper text' },
        { name: 'error', type: 'string', required: false, description: 'Error message' },
        { name: 'required', type: 'boolean', required: false, description: 'Required field indicator' }
      ],
      examples: [
        {
          title: 'Basic Usage',
          code: `const [value, setValue] = useState('');\n\n<Input\n  label="Email Address"\n  type="email"\n  value={value}\n  onChange={(e) => setValue(e.target.value)}\n  required\n/>`
        },
        {
          title: 'With Validation',
          code: `<Input\n  label="Password"\n  type="password"\n  error={errors.password}\n  description="Must be at least 8 characters"\n  required\n/>`
        }
      ],
      notes: 'The Input component extends all standard HTML input attributes while providing additional styling and validation features.'
    },
    {
      name: 'InputVariant',
      description: 'Available visual variants for the input component',
      properties: [
        { name: 'default', type: 'string', required: false, description: 'Standard input styling' },
        { name: 'filled', type: 'string', required: false, description: 'Filled background variant' },
        { name: 'outlined', type: 'string', required: false, description: 'Outlined border variant' }
      ]
    }
  ];

  const versionData = [
    {
      version: '2.1.0',
      status: 'supported',
      releaseDate: 'August 26, 2025',
      newFeatures: [
        'Added support for datetime-local input type',
        'Improved accessibility with better ARIA labels',
        'Enhanced error state styling'
      ],
      breakingChanges: [],
      migrationGuide: 'No breaking changes in this version. All existing implementations will continue to work.'
    },
    {
      version: '2.0.0',
      status: 'supported',
      releaseDate: 'July 15, 2025',
      newFeatures: [
        'Complete TypeScript rewrite',
        'New variant system (filled, outlined, ghost)',
        'Improved theme integration'
      ],
      breakingChanges: [
        'Removed size prop in favor of CSS classes',
        'Changed error prop from boolean to string',
        'Updated className behavior for better consistency'
      ],
      migrationGuide: `Update your imports:\n- Change size="large" to className="text-lg"\n- Update error={true} to error="Error message"\n- Review custom className usage`
    },
    {
      version: '1.5.2',
      status: 'deprecated',
      releaseDate: 'May 10, 2025',
      deprecated: [
        'Legacy size prop (use CSS classes instead)',
        'Boolean error prop (use string error messages)'
      ],
      migrationGuide: 'Please upgrade to version 2.x for continued support and new features.'
    }
  ];

  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      icon: 'FileText'
    },
    {
      id: 'props',
      title: 'Props',
      icon: 'Settings',
      subsections: [
        { id: 'basic-props', title: 'Basic Props' },
        { id: 'validation-props', title: 'Validation Props' },
        { id: 'styling-props', title: 'Styling Props' }
      ]
    },
    {
      id: 'types',
      title: 'TypeScript',
      icon: 'FileType'
    },
    {
      id: 'examples',
      title: 'Examples',
      icon: 'Code',
      subsections: [
        { id: 'basic-example', title: 'Basic Usage' },
        { id: 'validation-example', title: 'With Validation' },
        { id: 'advanced-example', title: 'Advanced Features' }
      ]
    },
    {
      id: 'accessibility',
      title: 'Accessibility',
      icon: 'Eye'
    },
    {
      id: 'versions',
      title: 'Versions',
      icon: 'GitBranch'
    }
  ];

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (filters) => {
    setActiveFilters(filters);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections?.flatMap(section => 
        section?.subsections 
          ? [section, ...section?.subsections]
          : [section]
      );

      for (const section of sectionElements) {
        const element = document.getElementById(section?.id);
        if (element) {
          const rect = element?.getBoundingClientRect();
          if (rect?.top <= 100 && rect?.bottom >= 100) {
            setActiveSection(section?.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <div className="flex pt-16">
        {/* Table of Contents Sidebar */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <TableOfContents
            sections={sections}
            activeSection={activeSection}
            onSectionClick={handleSectionClick}
            isOpen={isTocOpen}
            onToggle={() => setIsTocOpen(!isTocOpen)}
          />
        </div>

        {/* Mobile TOC */}
        <div className="lg:hidden">
          <TableOfContents
            sections={sections}
            activeSection={activeSection}
            onSectionClick={handleSectionClick}
            isOpen={isTocOpen}
            onToggle={() => setIsTocOpen(!isTocOpen)}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 max-w-4xl mx-auto px-6 py-8 pb-20 lg:pb-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
                <Icon name="FileText" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Component API Reference</h1>
                <p className="text-muted-foreground">Comprehensive technical documentation for Input components</p>
              </div>
            </div>

            <SearchInterface
              onSearch={handleSearch}
              onFilter={handleFilter}
              className="mb-6"
            />
          </div>

          {/* Overview Section */}
          <section id="overview" className="mb-12">
            <div className="flex items-center space-x-2 mb-6">
              <Icon name="FileText" size={20} className="text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Overview</h2>
            </div>
            
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                The Input component is a flexible, accessible, and highly customizable form input that provides 
                consistent design patterns and robust validation states across your React applications.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name="Zap" size={16} className="text-primary" />
                    <h3 className="font-semibold text-foreground">Key Features</h3>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• TypeScript support with strict prop interfaces</li>
                    <li>• Multiple input types (text, email, password, etc.)</li>
                    <li>• Built-in validation and error handling</li>
                    <li>• Accessible with proper ARIA attributes</li>
                    <li>• Theme-aware styling with dark mode support</li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name="Target" size={16} className="text-primary" />
                    <h3 className="font-semibold text-foreground">Use Cases</h3>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Form data collection and validation</li>
                    <li>• User authentication interfaces</li>
                    <li>• Search and filter functionality</li>
                    <li>• Settings and configuration panels</li>
                    <li>• Data entry and editing workflows</li>
                  </ul>
                </div>
              </div>

              <CodeBlock
                code={`import Input from 'components/ui/Input'
;\n\nfunction ContactForm() {\n  const [email, setEmail] = useState('');\n  const [error, setError] = useState('');\n\n  return (\n    <Input\n      label="Email Address"\n      type="email"\n      value={email}\n      onChange={(e) => setEmail(e.target.value)}\n      error={error}\n      description="We'll never share your email"\n      required\n    />\n  );\n}`}
                title="Quick Start Example"
                language="jsx"
              />
            </div>
          </section>

          {/* Props Section */}
          <section id="props" className="mb-12">
            <div className="flex items-center space-x-2 mb-6">
              <Icon name="Settings" size={20} className="text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Props</h2>
            </div>

            <div id="basic-props" className="mb-8">
              <PropTable
                props={inputProps?.filter(prop => 
                  !searchTerm || 
                  prop?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                  prop?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase())
                )}
                title="All Props"
                searchable={false}
              />
            </div>
          </section>

          {/* TypeScript Section */}
          <section id="types" className="mb-12">
            <TypeDefinition
              title="TypeScript Interfaces"
              interfaces={typeInterfaces}
            />
          </section>

          {/* Examples Section */}
          <section id="examples" className="mb-12">
            <div className="flex items-center space-x-2 mb-6">
              <Icon name="Code" size={20} className="text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Interactive Examples</h2>
            </div>

            <div className="space-y-8">
              <div id="basic-example">
                <LiveExample
                  title="Basic Input"
                  description="A simple text input with label and placeholder"
                  initialProps={{
                    label: 'Full Name',
                    type: 'text',
                    placeholder: 'Enter your full name'
                  }}
                />
              </div>

              <div id="validation-example">
                <LiveExample
                  title="Input with Validation"
                  description="Input with error state and helper text"
                  initialProps={{
                    label: 'Email Address',
                    type: 'email',
                    placeholder: 'Enter your email',
                    description: 'We\'ll use this to contact you',
                    error: 'Please enter a valid email address',
                    required: true
                  }}
                />
              </div>

              <div id="advanced-example">
                <LiveExample
                  title="Advanced Features"
                  description="Input with all features enabled"
                  initialProps={{
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Enter a secure password',
                    description: 'Must be at least 8 characters long',
                    required: true
                  }}
                />
              </div>
            </div>
          </section>

          {/* Accessibility Section */}
          <section id="accessibility" className="mb-12">
            <div className="flex items-center space-x-2 mb-6">
              <Icon name="Eye" size={20} className="text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Accessibility</h2>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-6">
                  The Input component follows WCAG 2.1 guidelines and includes comprehensive accessibility features.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">ARIA Attributes</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• <code>aria-label</code> or <code>aria-labelledby</code> for screen readers</li>
                      <li>• <code>aria-describedby</code> for helper text and errors</li>
                      <li>• <code>aria-invalid</code> when validation fails</li>
                      <li>• <code>aria-required</code> for required fields</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Keyboard Navigation</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• <kbd>Tab</kbd> to focus the input</li>
                      <li>• <kbd>Shift + Tab</kbd> to focus previous element</li>
                      <li>• <kbd>Enter</kbd> to submit form (if applicable)</li>
                      <li>• <kbd>Escape</kbd> to clear input (when clearable)</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Best Practices</h3>
                  <div className="bg-muted rounded-lg p-4">
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Always provide meaningful labels for screen readers</li>
                      <li>• Use appropriate input types for better mobile experience</li>
                      <li>• Provide clear error messages that explain how to fix issues</li>
                      <li>• Ensure sufficient color contrast (4.5:1 minimum)</li>
                      <li>• Test with keyboard navigation and screen readers</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Version Compatibility Section */}
          <section id="versions" className="mb-12">
            <VersionCompatibility versions={versionData} />
          </section>
        </main>
      </div>
      {/* Mobile Bottom Padding */}
      <div className="h-20 lg:hidden" />
    </div>
  );
};

export default ComponentAPIReference;