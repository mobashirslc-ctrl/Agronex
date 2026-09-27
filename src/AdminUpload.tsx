import React, { useState, useEffect } from 'react';
import { db } from './firebase'; // apnar firebase.ts file-er path onujayi thik kore nin
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  serverTimestamp, 
  onSnapshot,
  query
} from 'firebase/firestore';

interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  farmerSource: string;
  origin: string;
  qualityAssurance: string;
  freshness: string;
  previewUrl: string | null;
  createdAt?: any;
}

export default function AdminUpload() {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('Vegetables');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [farmerSource, setFarmerSource] = useState('Verified AgroNexus partner');
  const [origin, setOrigin] = useState('Bangladesh');
  const [qualityAssurance, setQualityAssurance] = useState('Multi-point checked');
  const [freshness, setFreshness] = useState('Farm-to-center in under 24h');
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Product list and editing states
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  // Real-time Firebase Firestore data fetch
  useEffect(() => {
    const q = query(collection(db, 'products'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productList: ProductItem[] = [];
      snapshot.forEach((docSnap) => {
        productList.push({ id: docSnap.id, ...docSnap.data() } as ProductItem);
      });
      setProducts(productList);
    }, (error) => {
      console.error("Error fetching products: ", error);
    });

    return () => unsubscribe();
  }, []);

  // Handle image selection, auto-resize, compress to prevent Firestore 1MB limit, and create Base64 preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 400; 
          const scaleSize = MAX_WIDTH / img.width;
          
          canvas.width = img.width > MAX_WIDTH ? MAX_WIDTH : img.width;
          canvas.height = img.width > MAX_WIDTH ? img.height * scaleSize : img.height;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          setPreviewUrl(compressedBase64);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const finalImageUrl = previewUrl || existingImageUrl;

      const productData = {
        name: productName,
        category,
        price: price || 'Not specified',
        description: description || 'Carefully sourced from verified growers and handled through the AgroNexus quality chain for freshness you can trust.',
        farmerSource: farmerSource || 'Verified AgroNexus partner',
        origin: origin || 'Bangladesh',
        qualityAssurance: qualityAssurance || 'Multi-point checked',
        freshness: freshness || 'Farm-to-center in under 24h',
        previewUrl: finalImageUrl || '',
      };

      if (editingId) {
        // Edit Mode: Update existing product in Firestore
        const productRef = doc(db, 'products', editingId);
        await setDoc(productRef, {
          ...productData,
          updatedAt: serverTimestamp(),
        }, { merge: true });

        alert('Product updated successfully in Firebase!');
        setEditingId(null);
        setExistingImageUrl(null);
      } else {
        // New Product Mode: Add to Firestore
        const newProductRef = doc(collection(db, 'products'));
        await setDoc(newProductRef, {
          ...productData,
          createdAt: serverTimestamp(),
        });

        alert('Product published successfully to live database!');
      }

      // Reset Form
      setProductName('');
      setPrice('');
      setDescription('');
      setFarmerSource('Verified AgroNexus partner');
      setOrigin('Bangladesh');
      setQualityAssurance('Multi-point checked');
      setFreshness('Farm-to-center in under 24h');
      setImageFile(null);
      setPreviewUrl(null);
    } catch (error: any) {
      console.error("Error saving product: ", error);
      alert(`Failed to save product: ${error.message || 'Please check console'}`);
    } finally {
      setLoading(false);
    }
  };

  // Load data for editing
  const handleEditProduct = (item: ProductItem) => {
    setEditingId(item.id);
    setProductName(item.name);
    setCategory(item.category);
    setPrice(item.price === 'Not specified' ? '' : item.price);
    setDescription(item.description || '');
    setFarmerSource(item.farmerSource || 'Verified AgroNexus partner');
    setOrigin(item.origin || 'Bangladesh');
    setQualityAssurance(item.qualityAssurance || 'Multi-point checked');
    setFreshness(item.freshness || 'Farm-to-center in under 24h');
    setPreviewUrl(item.previewUrl);
    setExistingImageUrl(item.previewUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete product from Firestore
  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this product from the live database?')) {
      try {
        await deleteDoc(doc(db, 'products', id));
        if (editingId === id) {
          setEditingId(null);
          setProductName('');
          setPrice('');
          setDescription('');
          setPreviewUrl(null);
          setExistingImageUrl(null);
        }
        alert('Product removed successfully!');
      } catch (error) {
        console.error("Error deleting product: ", error);
        alert('Failed to delete product.');
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* Upload / Edit Card */}
        <div style={{ background: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', padding: '30px' }}>
          
          {/* Header */}
          <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '15px', marginBottom: '25px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: '0 0 5px 0' }}>Agronex Admin Portal</h2>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
              {editingId ? 'Editing Product Mode (Live Firebase)' : 'Upload and manage products for live display.'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Product Name */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Product Name</label>
              <input 
                type="text" 
                value={productName} 
                onChange={(e) => setProductName(e.target.value)} 
                placeholder="e.g. Fresh Organic Tomato" 
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none' }}
                required
              />
            </div>

            {/* Category & Price Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Category</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', backgroundColor: '#fff', outline: 'none' }}
                >
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fish">Fish</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Oil Products">Oil Products</option>
                  <option value="Crops">Crops</option>
                  <option value="Honey">Honey</option>
                  <option value="Date Jaggery">Date Jaggery</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Price (Optional)</label>
                <input 
                  type="text" 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)} 
                  placeholder="e.g. 120 BDT / kg" 
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none' }}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Description</label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Write a short description about the product..." 
                rows={3}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none', resize: 'vertical' }}
              />
            </div>

            {/* Additional Details Fields for Modal */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Farmer Source</label>
                <input 
                  type="text" 
                  value={farmerSource} 
                  onChange={(e) => setFarmerSource(e.target.value)} 
                  placeholder="e.g. Verified AgroNexus partner" 
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Origin</label>
                <input 
                  type="text" 
                  value={origin} 
                  onChange={(e) => setOrigin(e.target.value)} 
                  placeholder="e.g. Bangladesh" 
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Quality Assurance</label>
                <input 
                  type="text" 
                  value={qualityAssurance} 
                  onChange={(e) => setQualityAssurance(e.target.value)} 
                  placeholder="e.g. Multi-point checked" 
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Freshness Timeline</label>
                <input 
                  type="text" 
                  value={freshness} 
                  onChange={(e) => setFreshness(e.target.value)} 
                  placeholder="e.g. Farm-to-center in under 24h" 
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none' }}
                />
              </div>
            </div>

            {/* Image Upload & Preview */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Product Image</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                style={{ width: '100%', fontSize: '14px', padding: '8px 0' }}
                {...(!previewUrl && { required: true })}
              />
              
              {previewUrl && (
                <div style={{ marginTop: '12px', width: '100px', height: '100px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e5e7eb', position: 'relative' }}>
                  <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
            </div>

            {/* Submit / Update Button & Cancel Edit */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button 
                type="submit" 
                disabled={loading}
                style={{ 
                  flex: 1,
                  padding: '12px', 
                  backgroundColor: editingId ? '#2563eb' : '#166534', 
                  color: '#ffffff', 
                  border: 'none', 
                  borderRadius: '8px', 
                  fontSize: '15px', 
                  fontWeight: '600', 
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                {loading ? 'Saving to Database...' : editingId ? 'Update Product' : 'Publish Product'}
              </button>

              {editingId && (
                <button 
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setProductName('');
                    setPrice('');
                    setDescription('');
                    setFarmerSource('Verified AgroNexus partner');
                    setOrigin('Bangladesh');
                    setQualityAssurance('Multi-point checked');
                    setFreshness('Farm-to-center in under 24h');
                    setPreviewUrl(null);
                    setExistingImageUrl(null);
                  }}
                  style={{ 
                    padding: '12px 20px', 
                    backgroundColor: '#e5e7eb', 
                    color: '#374151', 
                    border: 'none', 
                    borderRadius: '8px', 
                    fontSize: '15px', 
                    fontWeight: '600', 
                    cursor: 'pointer' 
                  }}
                >
                  Cancel
                </button>
              )}
            </div>

          </form>
        </div>

        {/* Uploaded Products Management List */}
        <div style={{ background: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', padding: '30px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', margin: '0 0 15px 0' }}>Manage Live Products ({products.length})</h3>
          
          {products.length === 0 ? (
            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>No products found in live database yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {products.map((item) => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 15px', borderRadius: '8px', border: '1px solid #e5e7eb', backgroundColor: '#fdfdfd' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    {item.previewUrl && (
                      <img src={item.previewUrl} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }} />
                    )}
                    <div>
                      <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#111827', margin: '0 0 3px 0' }}>{item.name}</h4>
                      <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>{item.category} &bull; <strong style={{ color: '#166534' }}>{item.price}</strong></p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => handleEditProduct(item)}
                      style={{ padding: '8px 12px', backgroundColor: '#dbeafe', color: '#1e40af', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteProduct(item.id)}
                      style={{ padding: '8px 12px', backgroundColor: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}