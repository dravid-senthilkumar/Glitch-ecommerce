import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/assets';
import PromoTitle from '../Components/PromoTitle';
import ProductItem from '../Components/ProductItem';

const Collection = () => {
  const {products,search,showSearch} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [ sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
   if(category.includes(e.target.value)){
    setCategory(prev => prev.filter((item) => item !== e.target.value))
   }
   else{
    setCategory(prev => [...prev, e.target.value])
   }
  };

  useEffect(() => {
    console.log(category)
  },[category])

  const toggleSubCategory = (e) => {
    if(subCategory.includes(e.target.value)){
     setSubCategory(prev => prev.filter((item) => item !== e.target.value))
    }
    else{
     setSubCategory(prev => [...prev, e.target.value])
    }
   };

   useEffect(() => {
    console.log(subCategory)
  },[subCategory])

  const applyFilter = () => {

      let copyProducts = products.slice();
    if(showSearch && search){
      copyProducts = copyProducts.filter((item) => (item.name.toLowerCase().includes(search.toLowerCase())))
    }  
    if(category.length > 0){
        copyProducts = copyProducts.filter((item) => category.includes(item.category))
    }
    if(subCategory.length > 0){
       copyProducts = copyProducts.filter((item) => subCategory.includes(item.subCategory))
  }
      setFilterProducts(copyProducts);
  };

  useEffect(() => {
    applyFilter();
  },[category,subCategory,showSearch,search,products])

  // const applySort = () => {
  //   let fpProductsCopy = [...filterProducts];
  
  //   if (sortType === "low-high"){
  //     setFilterProducts(fpProductsCopy.sort((a, b) => a.price - b.price));
  //   } 
  //   else if (sortType === "high-low"){
  //     setFilterProducts(fpProductsCopy.sort((a, b) => b.price - a.price));
  //   } 
  //   else{
  //     applyFilter();
  //   }
  // };

  const applySort = () => {
    let fpCopy = filterProducts.slice();
    if(sortType === "low-high"){
      setFilterProducts(fpCopy.sort((a,b) => (a.price - b.price)))
    }
    else if(sortType === "high-low"){
      setFilterProducts(fpCopy.sort((a,b) => (b.price - a.price)))
    }
    else{
      setSortType('relavent')
    }
    console.log(sortType,fpCopy)
  };

  useEffect(() => {
    applySort();
  }, [sortType]);
  
 
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* left side */}

      {/* filter */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'> FILTER
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ''}`} alt="0"/>
        </p>
        {/* CATEGORY */}
        <div className={`border border-gray-300 pl-5 py-5 py-3 mt-6 ${showFilter ? "" : "hidden"}`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={"Men"} onChange={(e) => toggleCategory(e)}/> Men
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={"Women"} onChange={(e) => toggleCategory(e)}/> Women
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={"Kids"} onChange={(e) => toggleCategory(e)}/> Kids
            </p>
          </div>
        </div>

        {/* {sub-category} */}
        <div className={`border border-gray-300 pl-5 py-5 py-3 my-5 ${showFilter ? "" : "hidden"}`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={"Topwear"} onChange={(e) => toggleSubCategory(e)}/> Topwear
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={"Bottomwear"} onChange={(e) => toggleSubCategory(e)}/> Bottomwear
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={"Winterwear"} onChange={(e) => toggleSubCategory(e)}/> Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
        <PromoTitle text1={"ALL"} text2={"COLLECTION"}/>
        {/* product sorting */}
        <select className=' border-2 border-gray-300 text-sm pt-0 px-2' onChange={(e) => setSortType(e.target.value)} >
          <option value="relavent">Sort by: Relavant</option>
          <option value="low-high">Sort by: Low to High</option>
          <option value="high-low">Sort by: High to Low</option>
        </select>
      </div>

      {/* display products */}

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
        {filterProducts.map((item,index) => (<ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>))}
      </div>

        </div>
    </div>
  )
}

export default Collection