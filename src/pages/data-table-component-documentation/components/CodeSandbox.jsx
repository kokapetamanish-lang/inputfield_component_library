import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CodeSandbox = ({ component }) => {
  const [activeTab, setActiveTab] = useState('component');

  const getCode = () => {
    switch (activeTab) {
      case 'component':
        return `import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';


const DataTable = ({ 
  data = [], 
  columns = [], 
  loading = false, 
  selectable = false, 
  onRowSelect 
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ 
    key: null, 
    direction: 'asc' 
  });

  // Sort data based on current sort configuration
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const handleSort = (columnKey) => {
    const column = columns.find(col => col.key === columnKey);
    if (!column?.sortable) return;

    let direction = 'asc';
    if (sortConfig.key === columnKey && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key: columnKey, direction });
  };

  const handleRowSelect = (row, isSelected) => {
    let newSelectedRows;
    
    if (isSelected) {
      newSelectedRows = [...selectedRows, row];
    } else {
      newSelectedRows = selectedRows.filter(selectedRow => 
        selectedRow !== row
      );
    }
    
    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  // Rest of component implementation...
  
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {/* Table implementation */}
    </div>
  );
};

export default DataTable;`;

      case 'types':
        return `// TypeScript Interface Definitions

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

// Example usage with specific type
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const UserTable: React.FC = () => {
  const userData: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' }
  ];
  
  const userColumns: Column<User>[] = [
    { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
    { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
    { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
    { key: 'status', title: 'Status', dataIndex: 'status', sortable: true }
  ];

  return (
    <DataTable<User>
      data={userData}
      columns={userColumns}
      selectable={true}
      onRowSelect={(rows) => console.log('Selected:', rows)}
    />
  );
};`;

      case 'usage':
        return `import React, { useState } from 'react';
import DataTable from './DataTable';

const MyComponent = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' }
  ];

  const columns = [
    { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
    { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
    { key: 'role', title: 'Role', dataIndex: 'role', sortable: true }
  ];

  const handleRowSelect = (rows) => {
    setSelectedRows(rows);
    console.log('Selected rows:', rows);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      
      {selectedRows.length > 0 && (
        <div className="mb-4 p-3 bg-primary/10 rounded-lg">
          <p className="text-primary">
            {selectedRows.length} row(s) selected
          </p>
        </div>
      )}
      
      <DataTable
        data={data}
        columns={columns}
        loading={loading}
        selectable={true}
        onRowSelect={handleRowSelect}
      />
    </div>
  );
};

export default MyComponent;`;

      default:
        return '';
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard?.writeText(getCode());
  };

  if (!component) {
    return (
      <div className="h-full bg-card border-l border-border flex items-center justify-center">
        <div className="text-center p-6">
          <Icon name="Code" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Code Sandbox</h3>
          <p className="text-muted-foreground text-sm">
            Select a component to view its code implementation
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-card border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Code Sandbox</h2>
          <button
            onClick={copyToClipboard}
            className="p-2 hover:bg-muted rounded-md transition-micro"
            title="Copy code"
          >
            <Icon name="Copy" size={16} />
          </button>
        </div>
      </div>
      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex">
          {[
            { id: 'component', label: 'Component' },
            { id: 'types', label: 'TypeScript' },
            { id: 'usage', label: 'Usage' }
          ]?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`
                px-4 py-2 text-sm font-medium border-b-2 transition-micro
                ${activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }
              `}
            >
              {tab?.label}
            </button>
          ))}
        </div>
      </div>
      {/* Code Content */}
      <div className="flex-1 overflow-y-auto">
        <pre className="p-4 text-xs font-mono text-foreground leading-relaxed">
          <code>{getCode()}</code>
        </pre>
      </div>
      {/* TypeScript Intellisense Panel */}
      <div className="border-t border-border p-4 bg-muted/20">
        <h3 className="text-sm font-medium text-foreground mb-2 flex items-center">
          <Icon name="Sparkles" size={16} className="mr-2" />
          TypeScript Support
        </h3>
        <div className="text-xs text-muted-foreground space-y-1">
          <p>✅ Generic types for type-safe data</p>
          <p>✅ IntelliSense for column configuration</p>
          <p>✅ Type-checked event handlers</p>
          <p>✅ Strict null checking support</p>
        </div>
      </div>
    </div>
  );
};

export default CodeSandbox;