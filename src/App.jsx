import React, { useState } from 'react';
import { MemoryRouter, Routes, Route, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
// Placeholder Icons and components — replace with your actual implementations
const Icons = {
  Home: () => <svg className="w-5 h-5" />,
  Products: () => <svg className="w-5 h-5" />,
  Search: (props) => <svg {...props} />,
  More: () => <svg className="w-4 h-4" />,
};

const ProductCard = ({ product, onSelect }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm">
    <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-2" />
    <h3 className="font-semibold">{product.name}</h3>
    <p className="text-sm text-gray-500">{product.type}</p>
    <button onClick={onSelect} className="mt-2 px-3 py-1 bg-blue-500 text-white rounded">Select</button>
  </div>
);

// Simple placeholders for editors
const ImageEditor = ({ image, onSave, onClose }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg w-96">
      <h2 className="text-lg font-semibold mb-4">Image Editor</h2>
      <img src={image.url} alt="editor" className="w-full h-48 object-contain mb-4" />
      <div className="flex gap-2 justify-end">
        <button onClick={() => { onSave({ ...image, url: image.url }); }} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
        <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Close</button>
      </div>
    </div>
  </div>
);

const PopCustomsEditor = ({ design, onSave, onClose }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg w-96">
      <h2 className="text-lg font-semibold mb-4">Mockup Editor</h2>
      <img src={design.url} alt="mockup" className="w-full h-48 object-contain mb-4" />
      <div className="flex gap-2 justify-end">
        <button onClick={() => onSave({ ...design, mockupUrl: design.url })} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
        <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Close</button>
      </div>
    </div>
  </div>
);

// Sample data
const productTypes = [
  { id: 'tshirt', name: 'T-Shirt' },
  { id: 'mug', name: 'Mug' },
  { id: 'poster', name: 'Poster' },
];

const products = [
  { id: 'p1', name: 'Classic Tee', type: 'tshirt', image: 'https://via.placeholder.com/400x300?text=Classic+Tee' },
  { id: 'p2', name: 'Ceramic Mug', type: 'mug', image: 'https://via.placeholder.com/400x300?text=Ceramic+Mug' },
  { id: 'p3', name: 'Wall Poster', type: 'poster', image: 'https://via.placeholder.com/400x300?text=Wall+Poster' },
  { id: 'p4', name: 'V-Neck Tee', type: 'tshirt', image: 'https://via.placeholder.com/400x300?text=V-Neck+Tee' },
  { id: 'p5', name: 'Travel Mug', type: 'mug', image: 'https://via.placeholder.com/400x300?text=Travel+Mug' },
];

// DESIGN WORKSPACE
const DesignWorkspace = () => {
  const [designs, setDesigns] = useState([
    { id: 'design-1', name: 'Design 1', url: 'https://via.placeholder.com/300x300/ffcc00/000000?text=Design+1', createdAt: new Date().toISOString() },
  ]);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [showMockupEditor, setShowMockupEditor] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDeleteDesign = (d) => {
    setDesigns(designs.filter((x) => x.id !== d.id));
  };

  const handleSaveDesign = (u) => {
    setDesigns((prev) => prev.map((d) => (d.id === u.id ? { ...d, ...u } : d)));
  };

  const handleCreateMockup = (product) => {
    setSelectedProduct(product);
    setShowMockupEditor(true);
  };

  const handleSaveMockup = (mockup) => {
    // In a real app, you'd persist the mockup or attach to product
    console.log('Saved mockup', mockup);
    setShowMockupEditor(false);
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Designs</h1>
        <p className="text-gray-600">Manage your designs and create product mockups</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {designs.map((d) => (
          <div key={d.id} className="bg-white p-4 rounded-lg shadow-sm">
            <img src={d.url} alt={d.name} className="w-full h-48 object-contain rounded-md mb-2" />
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{d.name}</h3>
                <p className="text-sm text-gray-500">{new Date(d.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setSelectedDesign(d); setShowEditor(true); }} className="px-3 py-1 bg-yellow-400 rounded">Edit</button>
                <button onClick={() => handleDeleteDesign(d)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Create Mockup</h2>
        <p className="text-gray-600 mb-4">Select a product to create a mockup</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} onSelect={() => handleCreateMockup(p)} />)}
        </div>
        <div className="mt-4 text-center">
          <Link to="/products" className="text-blue-500 flex items-center justify-center gap-1">View all products <Icons.More /></Link>
        </div>
      </div>

      {showEditor && <ImageEditor image={selectedDesign || { url: 'https://via.placeholder.com/300x300/ffffff/000000?text=New+Design', id: 'new' }} onSave={(u) => { if (selectedDesign) { handleSaveDesign(u); } else { setDesigns([...designs, { ...u, id: `design-${Date.now()}`, name: `Design ${designs.length + 1}`, createdAt: new Date().toISOString() }]); } setShowEditor(false); setSelectedDesign(null); }} onClose={() => { setShowEditor(false); setSelectedDesign(null); }} />}

      {showMockupEditor && selectedProduct && <PopCustomsEditor design={{ url: selectedDesign?.url || 'https://via.placeholder.com/300x300/ffffff/000000?text=Design', productType: selectedProduct.type }} onSave={handleSaveMockup} onClose={() => { setShowMockupEditor(false); setSelectedProduct(null); }} />}
    </div>
  );
};

// PRODUCTS PAGE
const ProductsPage = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const filteredProducts = products.filter((p) => {
    const matchesType = selectedType === 'all' || p.type === selectedType;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">Products</h1><p className="text-gray-600">Browse all available products</p></div>
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setSelectedType('all')} className={`px-4 py-2 rounded-lg text-sm font-medium ${selectedType === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}>All</button>
        {productTypes.map((t) => <button key={t.id} onClick={() => setSelectedType(t.id)} className={`px-4 py-2 rounded-lg text-sm font-medium ${selectedType === t.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}>{t.name}</button>)}
      </div>
      <div className="relative"><Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full max-w-md pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map((p) => <ProductCard key={p.id} product={p} onSelect={() => { }} />)}
      </div>
      {filteredProducts.length === 0 && <div className="text-center py-8 text-gray-500"><Icons.Products className="w-12 h-12 mx-auto mb-2" /><p>No products found</p></div>}
    </div>
  );
};

// MAIN APP
const App = () => {
  return (
    <MemoryRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white border-b sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-xl">DS</span></div>
                <span className="font-semibold text-lg hidden sm:block">Design Studio</span>
              </div>
              <div className="flex items-center gap-1">
                <Link to="/" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm flex items-center gap-1"><Icons.Home /> Home</Link>
                <Link to="/products" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm flex items-center gap-1"><Icons.Products /> Products</Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<DesignWorkspace />} />
              <Route path="/products" element={<ProductsPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-40">
          <div className="flex justify-around items-center py-2">
            <Link to="/" className="flex flex-col items-center gap-1 py-2 px-4 text-gray-600"><Icons.Home /><span className="text-xs">Home</span></Link>
            <Link to="/products" className="flex flex-col items-center gap-1 py-2 px-4 text-gray-600"><Icons.Products /><span className="text-xs">Products</span></Link>
          </div>
        </nav>
      </div>
    </MemoryRouter>
  );
};

export default App;
