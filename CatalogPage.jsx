import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package, Search, Sparkles, Star, ShieldCheck, RefreshCw,
  CreditCard, MapPin, Check, Plus, ChevronRight, X, Cpu,
  Layers, ArrowRight, Eye, ShoppingCart, Send
} from 'lucide-react';
import { PRODUCTS, BRANDS } from '../data/premiumRetailData';
import PageHeader from '../components/common/PageHeader';
import GlassCard from '../components/common/GlassCard';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { useToast } from '../hooks/useToast';
import styles from './CatalogPage.module.css';

export function CatalogPage() {
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [activeFilter, setActiveFilter] = useState('all'); // all, popular, featured
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductForSpecs, setSelectedProductForSpecs] = useState(null);
  const toast = useToast();

  const filteredProducts = PRODUCTS.filter((item) => {
    const matchesBrand = selectedBrand === 'All Brands' || item.brand === selectedBrand;
    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'popular' && item.isPopular) ||
      (activeFilter === 'featured' && item.isFeatured);
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesFilter && matchesSearch;
  });

  const handleDispatchQuote = (item) => {
    toast?.success?.(`Financing & trade-in quote for ${item.name} sent to active customer!`);
  };

  return (
    <div className={styles.page}>
      <PageHeader
        title="Premium Retail Product Catalog"
        subtitle="Live catalog, boutique stock allocation, warranty terms, exchange offers, and 0% financing for Apple, Samsung, Sony, LG, Dyson & Bose."
        badge={<Badge variant="gold"><Package size={11} /> 6 GLOBAL BRANDS</Badge>}
        actions={
          <div className={styles.headerFilters}>
            <button
              type="button"
              className={`${styles.filterPill} ${activeFilter === 'all' ? styles.filterPillActive : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Products ({PRODUCTS.length})
            </button>
            <button
              type="button"
              className={`${styles.filterPill} ${activeFilter === 'featured' ? styles.filterPillActive : ''}`}
              onClick={() => setActiveFilter('featured')}
            >
              Featured Products
            </button>
            <button
              type="button"
              className={`${styles.filterPill} ${activeFilter === 'popular' ? styles.filterPillActive : ''}`}
              onClick={() => setActiveFilter('popular')}
            >
              Popular Products
            </button>
          </div>
        }
      />

      {/* Brand Tabs & Search Controls */}
      <div className={styles.controlsBar}>
        <div className={styles.brandTabs}>
          {BRANDS.map((brand) => (
            <button
              key={brand}
              type="button"
              className={`${styles.brandTab} ${selectedBrand === brand ? styles.brandTabActive : ''}`}
              onClick={() => setSelectedBrand(brand)}
            >
              {brand}
            </button>
          ))}
        </div>

        <div className={styles.searchBox}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search Apple, Samsung, Sony, OLED, Airwrap..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className={styles.catalogGrid}>
        {filteredProducts.map((prod) => (
          <GlassCard key={prod.id} hover className={styles.productCard}>
            {/* Top Media Row */}
            <div className={styles.imageContainer}>
              <img src={prod.image} alt={prod.name} className={styles.productImg} />
              <div className={styles.imageOverlayTop}>
                <Badge variant="gold" size="sm">
                  {prod.brand}
                </Badge>
                {prod.isFeatured && (
                  <Badge variant="ai" size="sm">
                    Featured
                  </Badge>
                )}
              </div>
            </div>

            {/* Product Body */}
            <div className={styles.cardBody}>
              <div className={styles.priceRow}>
                <div className={styles.priceGroup}>
                  <span className={styles.priceVal}>${prod.price.toLocaleString()}</span>
                  <span className={styles.emiText}>{prod.emi}</span>
                </div>
                <div className={styles.ratingBadge}>
                  <Star size={12} className={styles.starIcon} />
                  <span>{prod.rating}</span>
                </div>
              </div>

              <h3 className={styles.prodTitle}>{prod.name}</h3>

              {/* Offer & Discount Ribbon */}
              <div className={styles.discountRibbon}>
                <Sparkles size={13} className={styles.sparkleIcon} />
                <span>{prod.discount}</span>
              </div>

              {/* Exchange Offer & Warranty Badges */}
              <div className={styles.offersSection}>
                <div className={styles.offerItem}>
                  <RefreshCw size={12} className={styles.offerIcon} />
                  <span>{prod.exchangeOffer}</span>
                </div>
                <div className={styles.offerItem}>
                  <ShieldCheck size={12} className={styles.offerIcon} />
                  <span>{prod.warranty}</span>
                </div>
              </div>

              {/* Boutique Stock Allocations */}
              <div className={styles.stockSection}>
                <span className={styles.stockTitle}>BOUTIQUE ALLOCATION:</span>
                <div className={styles.stockTagsList}>
                  {Object.entries(prod.stock).map(([store, count]) => (
                    <span key={store} className={styles.stockTag}>
                      {store.split(',')[0]}: <strong>{count} in stock</strong>
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Accessories */}
              <div className={styles.accessoriesSection}>
                <span className={styles.accessoriesTitle}>RECOMMENDED ACCESSORIES:</span>
                <div className={styles.accessoriesList}>
                  {prod.accessories.map((acc, i) => (
                    <div key={i} className={styles.accessoryChip}>
                      <span>{acc.name}</span>
                      <strong>+${acc.price}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className={styles.cardActions}>
                <button
                  type="button"
                  className={styles.specsBtn}
                  onClick={() => setSelectedProductForSpecs(prod)}
                >
                  <Eye size={13} />
                  <span>View Specifications</span>
                </button>

                <Button
                  variant="primary"
                  size="sm"
                  icon={Send}
                  onClick={() => handleDispatchQuote(prod)}
                >
                  Dispatch Quote
                </Button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Specifications Modal */}
      {selectedProductForSpecs && (
        <Modal
          isOpen={!!selectedProductForSpecs}
          onClose={() => setSelectedProductForSpecs(null)}
          title={selectedProductForSpecs.name}
          subtitle={`Brand: ${selectedProductForSpecs.brand} • MSRP: $${selectedProductForSpecs.price.toLocaleString()}`}
          maxWidth="640px"
          footer={
            <div className={styles.specsModalFooter}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedProductForSpecs(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={Send}
                onClick={() => {
                  handleDispatchQuote(selectedProductForSpecs);
                  setSelectedProductForSpecs(null);
                }}
              >
                Send Specs to Customer
              </Button>
            </div>
          }
        >
          <div className={styles.specsModalContent}>
            <div className={styles.specsImageRow}>
              <img
                src={selectedProductForSpecs.image}
                alt={selectedProductForSpecs.name}
                className={styles.specsModalImg}
              />
              <div className={styles.specsQuickSummary}>
                <Badge variant="gold">{selectedProductForSpecs.brand}</Badge>
                <h4>{selectedProductForSpecs.category}</h4>
                <p className={styles.specsDiscount}>{selectedProductForSpecs.discount}</p>
                <p className={styles.specsEmi}>{selectedProductForSpecs.emi}</p>
              </div>
            </div>

            <div className={styles.specsTable}>
              <h4 className={styles.specsTableTitle}>Technical Specifications</h4>
              <div className={styles.specsList}>
                {Object.entries(selectedProductForSpecs.specs).map(([key, val]) => (
                  <div key={key} className={styles.specsRow}>
                    <span className={styles.specKey}>{key}</span>
                    <span className={styles.specVal}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.warrantyBox}>
              <ShieldCheck size={16} className={styles.warrantyIcon} />
              <div>
                <h5>Warranty & Manufacturer Guarantee</h5>
                <p>{selectedProductForSpecs.warranty}</p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CatalogPage;
