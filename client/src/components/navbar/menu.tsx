import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import noPhotoIcon from "../../../public/259987.png";
import { useGetCategories } from "../../queries/categoryQueries";


const Menu = ({ onClose, isDisplayed }: { onClose: () => void; isDisplayed: boolean }) => {
  const { data: categories = [], isLoading, isError } = useGetCategories(); // ✅ default to empty array

  const [selectedId, setSelectedId] = useState<string>('');

  // Auto-select first category when data loads
  useEffect(() => {
    if (categories.length > 0 && !selectedId) {
      setSelectedId(categories[0]._id);
    }
  }, [categories, selectedId]);

  const selectedCategory = categories.find(cat => cat._id === selectedId);

  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`fixed inset-0 z-40 bg-transparent ${isDisplayed ? "block" : "hidden"}`}
      onClick={(e) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
          onClose();
        }
      }}
    >
      <div
        ref={menuRef}
        className={`fixed top-16 right-0 left-0 mx-auto mt-2 z-50 w-full max-w-7xl px-6 py-5
          bg-white rounded-xl shadow-xl border border-gray-100
          transition-all duration-500 ease-out transform
          ${isDisplayed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
        style={{ maxHeight: '80vh' }}
      >
        <div className="flex flex-row-reverse gap-12 h-[70vh]">
          {/* Category List */}
          <div className="w-1/4 min-w-[200px] flex-shrink-0">
            <nav className="space-y-2 overflow-y-auto pr-2 h-full">
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  to={`/categories/${cat._id}`} // ✅ use ID in URL
                  onMouseEnter={() => setSelectedId(cat._id)}
                  className={`block px-4 py-2.5 rounded-lg text-right transition-all duration-200
                    ${selectedId === cat._id
                      ? 'bg-red-50 text-red-700 font-semibold shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                  {cat.title} {/* ✅ NOT cat.name */}
                </Link>
              ))}
            </nav>
          </div>

          <div className="h-full my-2 w-1 rounded-full bg-red-500"></div>

          {/* Product Grid */}
          <div className="flex-1 overflow-y-auto pr-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {selectedCategory?.products?.map((product) => (
                <Link
                  key={product._id}
                  to={`/products/${product._id}`}
                  className="group block p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="relative w-full flex flex-col">
                    <img
                      src={
                        product.images?.[0]
                          ? String(product.images[0]).trim().startsWith('http')
                            ? product.images[0].trim()
                            : `http://localhost:5000/uploads/${product.images[0].trim()}`
                          : noPhotoIcon
                      }
                      alt={product.name}
                      className="w-full h-32 object-contain mb-2"
                    />
                    <span className="text-sm text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2 text-center">
                      {product.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;