import React, { useState } from 'react';
import DataTable from './DataTable';
import Icon from '../../../components/AppIcon';

const ComponentOverview = ({ component }) => {
  const [tableConfig, setTableConfig] = useState({
    loading: false,
    selectable: true,
    selectedRows: []
  });

  // Sample data for demonstration
  const sampleData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Pending' }
  ];

  const columns = [
    { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
    { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
    { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
    { key: 'status', title: 'Status', dataIndex: 'status', sortable: true }
  ];

  const handleRowSelect = (selectedRows) => {
    setTableConfig(prev => ({ ...prev, selectedRows }));
  };

  const handleConfigChange = (key, value) => {
    setTableConfig(prev => ({ ...prev, [key]: value }));
  };

  const getVariantData = () => {
    switch (component?.id) {
      case 'basic-table':
        return { data: sampleData?.slice(0, 3), selectable: false };
      case 'sortable-table':
        return { data: sampleData, selectable: false };
      case 'selectable-table':
        return { data: sampleData, selectable: true };
      case 'advanced-table':
        return { data: sampleData, selectable: true };
      default:
        return { data: sampleData, selectable: true };
    }
  };

  const variantData = getVariantData();

  if (!component) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Icon name="Table" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Select a Component</h3>
          <p className="text-muted-foreground">Choose a data table component from the sidebar to view its documentation.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Icon name="Table" size={32} className="text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">{component?.name}</h1>
              <p className="text-muted-foreground">{component?.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="px-3 py-1 text-sm bg-success/10 text-success rounded-full">
              {component?.status}
            </span>
            <span className="text-sm text-muted-foreground">
              Updated December 27, 2025
            </span>
          </div>
        </div>

        {/* Live Example */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Live Example</h2>
          
          {/* Controls */}
          <div className="mb-6 p-4 bg-muted/30 rounded-lg">
            <h3 className="text-sm font-medium text-foreground mb-3">Interactive Controls</h3>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={tableConfig?.loading}
                  onChange={(e) => handleConfigChange('loading', e?.target?.checked)}
                  className="w-4 h-4 text-primary focus:ring-primary border-border rounded"
                />
                <span className="text-sm text-foreground">Loading State</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={tableConfig?.selectable}
                  onChange={(e) => handleConfigChange('selectable', e?.target?.checked)}
                  className="w-4 h-4 text-primary focus:ring-primary border-border rounded"
                />
                <span className="text-sm text-foreground">Row Selection</span>
              </label>
            </div>
            
            {tableConfig?.selectedRows?.length > 0 && (
              <div className="mt-3 p-2 bg-primary/10 rounded text-sm text-primary">
                {tableConfig?.selectedRows?.length} row(s) selected
              </div>
            )}
          </div>

          {/* Data Table */}
          <DataTable
            data={variantData?.data}
            columns={columns}
            loading={tableConfig?.loading}
            selectable={variantData?.selectable && tableConfig?.selectable}
            onRowSelect={handleRowSelect}
          />
        </div>

        {/* Features */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="ArrowUpDown" size={20} className="text-primary" />
                <h3 className="font-medium text-foreground">Column Sorting</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Click on sortable column headers to sort data in ascending or descending order.
              </p>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="CheckSquare" size={20} className="text-primary" />
                <h3 className="font-medium text-foreground">Row Selection</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Select individual rows or use the header checkbox to select all rows at once.
              </p>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Loader2" size={20} className="text-primary" />
                <h3 className="font-medium text-foreground">Loading States</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Built-in loading skeleton with shimmer animation for better user experience.
              </p>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Accessibility" size={20} className="text-primary" />
                <h3 className="font-medium text-foreground">Accessibility</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Full ARIA support with proper labeling, role attributes, and keyboard navigation.
              </p>
            </div>
          </div>
        </div>

        {/* TypeScript Interfaces */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">TypeScript Interfaces</h2>
          <div className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <h3 className="text-sm font-medium text-foreground mb-2">DataTableProps&lt;T&gt;</h3>
              <pre className="text-sm text-muted-foreground font-mono">
{`interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}`}
              </pre>
            </div>

            <div className="p-4 bg-muted/30 rounded-lg">
              <h3 className="text-sm font-medium text-foreground mb-2">Column&lt;T&gt;</h3>
              <pre className="text-sm text-muted-foreground font-mono">
{`interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Usage Examples</h2>
          <div className="p-4 bg-muted/30 rounded-lg">
            <pre className="text-sm text-foreground font-mono overflow-x-auto">
{`import DataTable from './DataTable';

const MyComponent = () => {
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];

  const columns = [
    { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
    { key: 'email', title: 'Email', dataIndex: 'email', sortable: true }
  ];

  const handleRowSelect = (selectedRows) => {
    console.log('Selected rows:', selectedRows);
  };

  return (
    <DataTable
      data={data}
      columns={columns}
      selectable={true}
      onRowSelect={handleRowSelect}
    />
  );
};`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentOverview;