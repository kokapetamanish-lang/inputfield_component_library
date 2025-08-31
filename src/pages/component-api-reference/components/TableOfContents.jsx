import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const TableOfContents = ({ sections, activeSection, onSectionClick, isOpen, onToggle }) => {
  const [expandedSections, setExpandedSections] = useState(new Set(['props']));

  const toggleSection = (sectionId) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded?.has(sectionId)) {
      newExpanded?.delete(sectionId);
    } else {
      newExpanded?.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleSectionClick = (sectionId) => {
    onSectionClick(sectionId);
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-20 right-4 z-50 bg-primary text-primary-foreground p-2 rounded-md shadow-lg"
      >
        <Icon name={isOpen ? 'X' : 'Menu'} size={20} />
      </button>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onToggle}
        />
      )}
      {/* Table of Contents */}
      <div className={`
        fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)] w-80 lg:w-full
        bg-background border-r border-border overflow-y-auto z-50 lg:z-auto
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Contents</h3>
            <button
              onClick={onToggle}
              className="lg:hidden text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          <nav className="space-y-2">
            {sections?.map((section) => (
              <div key={section?.id}>
                <button
                  onClick={() => section?.subsections ? toggleSection(section?.id) : handleSectionClick(section?.id)}
                  className={`
                    flex items-center justify-between w-full px-3 py-2 text-left rounded-md transition-micro
                    ${activeSection === section?.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <div className="flex items-center space-x-2">
                    <Icon name={section?.icon} size={16} />
                    <span className="text-sm font-medium">{section?.title}</span>
                  </div>
                  {section?.subsections && (
                    <Icon 
                      name={expandedSections?.has(section?.id) ? 'ChevronDown' : 'ChevronRight'} 
                      size={14} 
                    />
                  )}
                </button>

                {section?.subsections && expandedSections?.has(section?.id) && (
                  <div className="ml-6 mt-1 space-y-1">
                    {section?.subsections?.map((subsection) => (
                      <button
                        key={subsection?.id}
                        onClick={() => handleSectionClick(subsection?.id)}
                        className={`
                          flex items-center space-x-2 w-full px-3 py-1.5 text-left rounded-md transition-micro
                          ${activeSection === subsection?.id 
                            ? 'bg-accent text-accent-foreground' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                          }
                        `}
                      >
                        <div className="w-2 h-2 rounded-full bg-current opacity-50" />
                        <span className="text-sm">{subsection?.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-border">
            <div className="text-xs text-muted-foreground space-y-2">
              <div>Version 2.1.0</div>
              <div>Last updated: Aug 26, 2025</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableOfContents;