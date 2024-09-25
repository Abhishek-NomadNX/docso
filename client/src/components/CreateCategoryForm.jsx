import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";

const CreateCategoryForm = () => {
  const [categoryType, setCategoryType] = useState('parent'); // New state to track category type
  const [categoryData, setCategoryData] = useState({
    categoryIcon: '',
    categoryName: '',
    parentCategoryName: '', // Now using parentCategoryName instead of parentCategoryId
    status: 'active',
  });

  const [parentCategories, setParentCategories] = useState([]); // To store parent categories
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryType === 'subcategory') {
      // Fetch the list of parent categories when 'subcategory' is selected
      const fetchParentCategories = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/categories/get-parent-categories`);
          setParentCategories(response.data);
        } catch (error) {
          console.error('Error fetching parent categories:', error);
        }
      };
      fetchParentCategories();
    }
  }, [categoryType]); // Fetch categories only when category type changes to 'subcategory'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/categories/create-category`, {
        ...categoryData,
        parentCategoryName: categoryType === 'parent' ? '' : categoryData.parentCategoryName // If parent, omit parentCategoryName
      });
      console.log('Category created:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mb-6">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Create a New Category</h1>
        
        {/* Radio Buttons for Category Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Category Type:</label>
          <div className="flex items-center">
            <label className="mr-4">
              <input
                type="radio"
                name="categoryType"
                value="parent"
                checked={categoryType === 'parent'}
                onChange={() => setCategoryType('parent')}
                className="mr-2"
              />
              Parent Category
            </label>
            <label>
              <input
                type="radio"
                name="categoryType"
                value="subcategory"
                checked={categoryType === 'subcategory'}
                onChange={() => setCategoryType('subcategory')}
                className="mr-2"
              />
              Subcategory
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Common Fields */}
          <div>
            <label htmlFor="categoryIcon" className="block text-sm font-medium text-gray-700 mb-2">
              Category Icon URL:
            </label>
            <input
              type="text"
              id="categoryIcon"
              name="categoryIcon"
              value={categoryData.categoryIcon}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-2">
              Category Name:
            </label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              value={categoryData.categoryName}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Conditionally Render Parent Category Name Field */}
          {categoryType === 'subcategory' && (
            <div>
              <label htmlFor="parentCategoryName" className="block text-sm font-medium text-gray-700 mb-2">
                Parent Category Name (required for subcategory):
              </label>
              <select
                id="parentCategoryName"
                name="parentCategoryName"
                value={categoryData.parentCategoryName}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Parent Category</option>
                {parentCategories.map((category) => (
                  <option key={category._id} value={category.categoryName}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status:
            </label>
            <select
              id="status"
              name="status"
              value={categoryData.status}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Create Category
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateCategoryForm;
