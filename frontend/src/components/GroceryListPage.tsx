import { useState } from 'react';
import { Leaf, ShoppingCart, Plus, Trash2, Check, Download, Printer, ArrowLeft } from 'lucide-react';
import type { UserProfile } from '../types/user';


type GroceryListPageProps = {
  userProfile: UserProfile;
  onNavigate: (page: 'mealfeed' | 'planner' | 'grocery') => void;
};

type GroceryItem = {
  id: string;
  name: string;
  quantity: string;
  category: string;
  checked: boolean;
  estimatedPrice: number;
};

const initialGroceryItems: GroceryItem[] = [
  { id: '1', name: 'Eggs', quantity: '1 dozen', category: 'Dairy & Eggs', checked: false, estimatedPrice: 4.99 },
  { id: '2', name: 'Spinach', quantity: '2 bunches', category: 'Vegetables', checked: false, estimatedPrice: 3.99 },
  { id: '3', name: 'Mushrooms', quantity: '8 oz', category: 'Vegetables', checked: false, estimatedPrice: 2.99 },
  { id: '4', name: 'Bell Peppers', quantity: '3 pieces', category: 'Vegetables', checked: false, estimatedPrice: 4.47 },
  { id: '5', name: 'Salmon Fillets', quantity: '1 lb', category: 'Seafood', checked: false, estimatedPrice: 14.99 },
  { id: '6', name: 'Chicken Breast', quantity: '2 lbs', category: 'Meat', checked: false, estimatedPrice: 9.98 },
  { id: '7', name: 'Quinoa', quantity: '1 lb', category: 'Grains', checked: false, estimatedPrice: 5.99 },
  { id: '8', name: 'Broccoli', quantity: '2 heads', category: 'Vegetables', checked: false, estimatedPrice: 3.98 },
  { id: '9', name: 'Olive Oil', quantity: '1 bottle', category: 'Pantry', checked: false, estimatedPrice: 8.99 },
  { id: '10', name: 'Greek Yogurt', quantity: '32 oz', category: 'Dairy & Eggs', checked: false, estimatedPrice: 5.99 },
  { id: '11', name: 'Blueberries', quantity: '1 pint', category: 'Fruits', checked: false, estimatedPrice: 4.99 },
  { id: '12', name: 'Sweet Potatoes', quantity: '3 lbs', category: 'Vegetables', checked: false, estimatedPrice: 4.47 },
];

const categories = ['All', 'Vegetables', 'Fruits', 'Dairy & Eggs', 'Meat', 'Seafood', 'Grains', 'Pantry'];

export function GroceryListPage({ userProfile, onNavigate }: GroceryListPageProps) {
  const [items, setItems] = useState<GroceryItem[]>(initialGroceryItems);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newItemName, setNewItemName] = useState('');
  const [showAddItem, setShowAddItem] = useState(false);

  const filteredItems = selectedCategory === 'All' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const addItem = () => {
    if (newItemName.trim()) {
      const newItem: GroceryItem = {
        id: Date.now().toString(),
        name: newItemName,
        quantity: '1',
        category: 'Pantry',
        checked: false,
        estimatedPrice: 0,
      };
      setItems([...items, newItem]);
      setNewItemName('');
      setShowAddItem(false);
    }
  };

  const totalPrice = items.reduce((sum, item) => sum + (item.checked ? 0 : item.estimatedPrice), 0);
  const checkedCount = items.filter(item => item.checked).length;

  const itemsByCategory = categories.slice(1).map(category => ({
    category,
    items: items.filter(item => item.category === category),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Leaf className="w-8 h-8 text-green-600" />
              <h1 className="text-2xl">Grocery List</h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-green-500 transition-colors">
                <Printer className="w-5 h-5" />
                Print
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Download className="w-5 h-5" />
                Export
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => onNavigate('mealfeed')}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Meal Feed
          </button>
          <button
            onClick={() => onNavigate('planner')}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Weekly Planner
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
            Grocery List
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main List */}
          <div className="lg:col-span-2">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-2xl mb-1">{items.length}</div>
                <div className="text-sm text-gray-600">Total Items</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-2xl mb-1">{checkedCount}</div>
                <div className="text-sm text-gray-600">Checked Off</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-2xl mb-1">${totalPrice.toFixed(2)}</div>
                <div className="text-sm text-gray-600">Estimated Total</div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-green-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Items List by Category */}
            <div className="space-y-6">
              {selectedCategory === 'All' ? (
                itemsByCategory.map(({ category, items: categoryItems }) => (
                  categoryItems.length > 0 && (
                    <div key={category} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                      <div className="px-6 py-4 bg-gray-50 border-b">
                        <h3 className="text-lg">{category}</h3>
                      </div>
                      <ul className="divide-y">
                        {categoryItems.map(item => (
                          <li key={item.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4">
                              <button
                                onClick={() => toggleItem(item.id)}
                                className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                                  item.checked
                                    ? 'bg-green-600 border-green-600'
                                    : 'border-gray-300 hover:border-green-500'
                                }`}
                              >
                                {item.checked && <Check className="w-4 h-4 text-white" />}
                              </button>
                              <div className="flex-1">
                                <div className={`transition-all ${item.checked ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                                  {item.name}
                                </div>
                                <div className="text-sm text-gray-500">{item.quantity}</div>
                              </div>
                              <div className="text-right">
                                <div className={item.checked ? 'line-through text-gray-400' : 'text-gray-900'}>
                                  ${item.estimatedPrice.toFixed(2)}
                                </div>
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                ))
              ) : (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <ul className="divide-y">
                    {filteredItems.map(item => (
                      <li key={item.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => toggleItem(item.id)}
                            className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                              item.checked
                                ? 'bg-green-600 border-green-600'
                                : 'border-gray-300 hover:border-green-500'
                            }`}
                          >
                            {item.checked && <Check className="w-4 h-4 text-white" />}
                          </button>
                          <div className="flex-1">
                            <div className={`transition-all ${item.checked ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-500">{item.quantity}</div>
                          </div>
                          <div className="text-right">
                            <div className={item.checked ? 'line-through text-gray-400' : 'text-gray-900'}>
                              ${item.estimatedPrice.toFixed(2)}
                            </div>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Add Item Button */}
            {showAddItem ? (
              <div className="mt-6 bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg mb-4">Add New Item</h3>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Item name"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addItem()}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    autoFocus
                  />
                  <button
                    onClick={addItem}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setShowAddItem(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAddItem(true)}
                className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-4 border-2 border-dashed border-gray-300 rounded-2xl hover:border-green-500 hover:bg-green-50 transition-all"
              >
                <Plus className="w-5 h-5" />
                Add Custom Item
              </button>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Shopping Tips */}
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="text-xl mb-4">Shopping Tips</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2" />
                  <span>Shop seasonal produce for better prices</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2" />
                  <span>Buy in bulk for non-perishable items</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2" />
                  <span>Check unit prices to compare value</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2" />
                  <span>Bring reusable bags to save money and help the environment</span>
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Budget:</span>
                  <span className="text-green-600">{userProfile.budget}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Estimated:</span>
                  <span className="text-2xl">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Store Finder */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white shadow-sm">
              <ShoppingCart className="w-8 h-8 mb-4" />
              <h3 className="text-xl mb-2">Find Stores Near You</h3>
              <p className="text-green-50 text-sm mb-4">
                Get directions to nearby grocery stores with the best prices
              </p>
              <button className="w-full px-4 py-2 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                Find Stores
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}